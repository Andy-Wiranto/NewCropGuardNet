import { collection, addDoc, query, where, getDocs, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { uploadScanImage, deleteScanImage } from "@/app/actions/uploadAction";

/**
 * Service to handle Scan History operations
 * Architecture: Firebase Firestore (Database) + Supabase (Storage via Server Action)
 */
class HistoryService {
  /**
   * Deletes a scan record from Firestore and its associated image from Supabase
   */
  async deleteScan(scanId, imageUrl) {
    if (!scanId) throw new Error("No scan ID provided");

    try {
      // 1. Delete the image from Supabase Storage using the secure Server Action
      if (imageUrl) {
        const deleteResult = await deleteScanImage(imageUrl);
        if (!deleteResult.success) {
          console.warn("Failed to delete image from Supabase, but continuing to delete record:", deleteResult.error);
        }
      }

      // 2. Delete the metadata record from Firebase Firestore
      await deleteDoc(doc(db, "scan_history", scanId));
      
      return true;
    } catch (error) {
      console.error("Error deleting scan:", error);
      if (error.code === 'permission-denied') {
        throw new Error("PERMISSION_DENIED");
      }
      throw new Error("Failed to delete scan");
    }
  }
  /**
   * Uploads the original image via Server Action to bypass Supabase RLS, 
   * then saves the prediction record to Firebase Firestore
   */
  async saveScan(userId, imageFile, prediction) {
    if (!userId) throw new Error("User must be authenticated to save scan");
    if (!imageFile) throw new Error("No image file provided");

    try {
      // 1. Upload the uncompressed image to Supabase using the Secure Server Action
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("imageFile", imageFile);

      const uploadResult = await uploadScanImage(formData);

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Failed to upload image to Supabase");
      }

      const downloadUrl = uploadResult.url;

      // 2. Save the metadata to Firebase Firestore
      const scanData = {
        userId: userId,
        imageUrl: downloadUrl,
        label: prediction.label,
        rawLabel: prediction.rawLabel,
        confidence: prediction.confidence,
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, "scan_history"), scanData);
      
      return { id: docRef.id, ...scanData };
    } catch (error) {
      console.error("Error saving scan history:", error);
      if (error.code === 'permission-denied') {
        throw new Error("PERMISSION_DENIED");
      }
      throw new Error("Failed to save scan history");
    }
  }

  /**
   * Fetches the user's scan history from Firebase Firestore
   */
  async getUserHistory(userId) {
    if (!userId) return [];

    try {
      // Query only by userId to avoid needing a Firebase Composite Index
      const q = query(
        collection(db, "scan_history"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);
      const history = [];
      
      querySnapshot.forEach((doc) => {
        history.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Sort by createdAt descending on the client side instead
      history.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

      return history;
    } catch (error) {
      console.error("Error fetching user history:", error);
      if (error.code === 'permission-denied') {
        throw new Error("PERMISSION_DENIED");
      }
      throw new Error("Failed to load scan history");
    }
  }
}

export const historyService = new HistoryService();

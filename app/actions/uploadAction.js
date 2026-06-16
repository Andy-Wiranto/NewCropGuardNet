"use server";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with the Secret Key to bypass RLS policies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(supabaseUrl, supabaseSecretKey);

export async function uploadScanImage(formData) {
  try {
    const userId = formData.get("userId");
    const imageFile = formData.get("imageFile");

    if (!userId || !imageFile) {
      throw new Error("Missing userId or imageFile");
    }

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = imageFile.name ? imageFile.name.split('.').pop() : "jpg";
    const filename = `${userId}/${timestamp}_${randomStr}.${extension}`;

    // The secret key bypasses RLS, so this will succeed even without public upload policies
    const { error: uploadError } = await supabase.storage
      .from("scans")
      .upload(filename, imageFile, {
        cacheControl: "3600",
        upsert: false
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      throw new Error(uploadError.message);
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from("scans")
      .getPublicUrl(filename);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (error) {
    console.error("Server Action upload error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteScanImage(imageUrl) {
  try {
    if (!imageUrl) {
      throw new Error("No image URL provided");
    }

    // Extract the filename (including the user ID folder) from the public URL
    // URL format: https://[projectId].supabase.co/storage/v1/object/public/scans/[userId]/[filename.jpg]
    const scansIndex = imageUrl.indexOf("/scans/");
    if (scansIndex === -1) {
      console.warn("Invalid Supabase URL, cannot extract filename:", imageUrl);
      return { success: true }; // Skip deletion if it's an invalid or mock URL
    }

    const filepath = imageUrl.substring(scansIndex + 7); // +7 to skip "/scans/"

    // The secret key bypasses RLS, ensuring deletion succeeds
    const { error: deleteError } = await supabase.storage
      .from("scans")
      .remove([filepath]);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      throw new Error(deleteError.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action delete error:", error);
    return { success: false, error: error.message };
  }
}

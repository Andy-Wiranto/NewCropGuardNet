import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://txblczweclzvhgjcipwq.supabase.co',
  'sb_secret_KRdquzxj8TJT0chCm-3VKw_BFpt9T1f'
);

async function setupBucket() {
  console.log("Creating public bucket 'scans'...");
  const { data, error } = await supabase.storage.createBucket('scans', {
    public: true
  });
  
  if (error) {
    if (error.message.includes("already exists")) {
       console.log("Bucket already exists. Good to go!");
    } else {
       console.error("Error creating bucket:", error);
    }
  } else {
    console.log("Bucket created successfully!");
  }
}

setupBucket();

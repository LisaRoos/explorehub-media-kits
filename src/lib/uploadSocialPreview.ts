import { supabase } from "@/integrations/supabase/client";

export async function uploadSocialPreview(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `social-preview.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('website_assets')
      .upload(fileName, file, {
        upsert: true, // This will replace any existing file with the same name
        contentType: file.type
      });

    if (error) {
      console.error('Error uploading social preview:', error);
      throw error;
    }

    const { data: publicUrl } = supabase.storage
      .from('website_assets')
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Error in uploadSocialPreview:', error);
    throw error;
  }
}
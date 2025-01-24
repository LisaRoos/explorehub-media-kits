import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { PackageBasicInfo } from "./form/PackageBasicInfo";
import { PackageMediaUpload } from "./form/PackageMediaUpload";
import { PackageFormActions } from "./form/PackageFormActions";

export const CreatePackageForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState<string[]>([]);

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return profile;
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('packages')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('packages')
        .getPublicUrl(filePath);

      setMedia([...media, publicUrl]);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) {
      toast.error('No profile found');
      return;
    }

    try {
      const { error } = await supabase
        .from('influencer_packages')
        .insert({
          profile_id: profile.id,
          title,
          description,
          price: parseFloat(price),
          media,
        });

      if (error) throw error;

      toast.success('Package created successfully');
      navigate('/dashboard/packages');
    } catch (error) {
      console.error('Error creating package:', error);
      toast.error('Error creating package');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out my package!',
        text: `${title} - ${description}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 col-span-2 md:col-span-1">
          <PackageBasicInfo
            title={title}
            setTitle={setTitle}
            price={price}
            setPrice={setPrice}
            description={description}
            setDescription={setDescription}
          />
        </Card>

        <Card className="p-6 col-span-2 md:col-span-1">
          <PackageMediaUpload
            media={media}
            onImageUpload={handleImageUpload}
          />
        </Card>
      </div>

      <PackageFormActions
        onSubmit={handleSubmit}
        onShare={handleShare}
      />
    </form>
  );
};
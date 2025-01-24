import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

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
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 col-span-2 md:col-span-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Package Title</label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter package title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input
                required
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter package description"
                rows={4}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 col-span-2 md:col-span-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Package Images</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                {media.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Package image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 flex gap-4">
        <Button type="submit" className="flex-1">
          Create Package
        </Button>
        <Button type="button" variant="outline" onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </form>
  );
};
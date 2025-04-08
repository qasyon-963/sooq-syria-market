
-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'Product Images', true);

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Anyone can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products');

-- Create policy to allow public read access to all images
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Create policy to allow users to update their own images
CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'products' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy to allow users to delete their own images
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
USING (bucket_id = 'products' AND auth.uid()::text = (storage.foldername(name))[1]);

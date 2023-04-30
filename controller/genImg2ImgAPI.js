import axios from 'axios';
import formidable from 'formidable';
import * as fs from 'fs';
import FormData from 'form-data';

export const generateImgByImg = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (error, fields, files) => {
    const { prompt } = fields;
    const { image } = files;

    const formData = new FormData();

    formData.append('init_image', fs.readFileSync(image.filepath));
    formData.append('init_image_mode', 'IMAGE_STRENGTH');
    formData.append('image_strength', 0.35);
    formData.append('text_prompts[0][text]', prompt);
    formData.append('cfg_scale', 7);
    formData.append('clip_guidance_preset', 'FAST_BLUE');
    formData.append('samples', 1);
    formData.append('steps', 30);
    console.log('3');

    const { data } = await axios.post(
      'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/image-to-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization:
            'Bearer sk-AjQlvuov16EM0qpRX4W1KsDTpTXvnHzO6mHqd0n6Bgb7jGr8',
        },
      }
    );

    var img = await Buffer.from(data.artifacts[0].base64, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });

    res.end(img);
  });
};

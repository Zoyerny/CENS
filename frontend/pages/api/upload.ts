import { NextApiHandler, NextApiRequest } from 'next';
import formidable, { Fields } from 'formidable';
import path from 'path';
import fs from "fs/promises"
import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (req: NextApiRequest, saveLocally?: boolean)
    : Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {}
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/uploads");
        options.filename = (name, ext, path, form) => {
            return uuidv4();
        }
    }

    const form = formidable(options);
    return new Promise((resolve, rejects) => {
        form.parse(req, (err, fields, files) => {
            if (err) rejects(err)
            resolve({ fields, files })
        })
    })
}

const handler: NextApiHandler = async (req, res) => {

    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/uploads"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/uploads"));
    }

    const result = await readFile(req, true);
    const data = result.files.myImage
    res.json(data);
}

export default handler;
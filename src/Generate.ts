import * as fs from 'fs';
import { fabric } from 'fabric';
import * as MongoDB from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../.env`});

const MODE = 'PROD'; // 'PROD' | 'DEV';
const CONNECTION_KEY = `${MODE}_DB_DSN`;

const CanvasMetaProp = "data";
const CanvasMetaProps: string[] = [CanvasMetaProp];

const TEST_LOGO = "logobean space cadets";

const TEST_LOGOS = [
    "Andrews Space Cadets2024-06-19T04:30:04.641Z",
    "LOGOBEAN SPACE CADETS2024-06-19T22:03:26.845Z",
    "LOGOBEAN SPACE CADETS2024-06-19T22:11:59.638Z",
    "LOGOBEAN2024-06-20T06:28:38.110Z",
    "Space Cadets2024-07-05T23:41:40.777Z",
    "Logobean2024-07-21T11:20:33.589Z"
]

type IManifest = {
    brandName: string;
    date: Date;
    image: string;
    slogan: string;
    params: any;
}

const SaveFile = (filename: string, content: string) => {
    fs.writeFileSync(`${__dirname}/../public/output/${filename}`, content);
}

function GroupSelected(
    canvas: fabric.Canvas,
    onComplete?: (group: fabric.Group) => void
) {
    const activeObj: any = canvas.getActiveObject() as fabric.ActiveSelection;
    const activeGroup = activeObj.toGroup();

    activeGroup.clone(function (newGroup: any) {
        canvas.remove(activeGroup);
        const objectsInGroup: fabric.Object[] = activeGroup.getObjects();

        objectsInGroup.forEach((object: fabric.Object) => {
            canvas.remove(object);
        });

        canvas.add(newGroup);
        canvas.setActiveObject(newGroup);

        if (!!onComplete) {
            onComplete(newGroup);
        }
    }, CanvasMetaProps);
}

function SelectAll(canvas: fabric.Canvas) {
    canvas.discardActiveObject();

    const sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas
    });

    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
}

// Function to resize canvas and scale objects
function LoadAndResizeCanvas(
    filename: string,
    json: any
): Promise<void> {
    const canvas = new fabric.Canvas(null, {
      width: 800,  // Initial canvas size
      height: 600,
      enableRetinaScaling: false
    });

     // Load the JSON data into the canvas
    function LoadFromJSON(
        canvas: fabric.Canvas,
        json: any
    ): Promise<fabric.Canvas> {
        return new Promise(resolve => {
            canvas.loadFromJSON(json, () => {
                SelectAll(canvas);

                GroupSelected(canvas, (logo: fabric.Group) => {
                    // Scale to max width/height
                    const canvasWidth = canvas.getWidth();

                    logo.scaleToWidth(canvasWidth);
                    canvas.setHeight(logo.getScaledHeight());
                    canvas.centerObject(logo);
                    canvas.renderAll();

                    resolve(canvas);
                });
            })
        });
    }

    return LoadFromJSON(canvas, json)
    .then(() => {
        const svg = canvas.toSVG();
        SaveFile(`${filename}.svg`, svg);
    });
 }

 const IsNotTestPurchase = (manifest: IManifest): boolean => {
    const { brandName, date } = manifest;

    return (brandName.toLowerCase() !== TEST_LOGO)
        && !TEST_LOGOS.includes(`${brandName}${date.toISOString()}`);
 }

const main = async () => {
    const connectionString = process.env[CONNECTION_KEY];
    console.log(`Connecting to DB: ${connectionString}`);

    return MongoDB.MongoClient.connect(connectionString!)
    .then(async (client: MongoDB.MongoClient) => {
        const db = client.db();
        const count = await db.collection('purchased_logos').countDocuments();
        const cursor = db.collection('purchased_logos').find();

        const manifests = [];
        let fileIndex = 1;

        for await (const purchasedLogo of cursor) {

            const { logo } = purchasedLogo;
            const manifest: IManifest = purchasedLogo.manifest;

            if (IsNotTestPurchase(manifest)) {
                const { json, params } = logo.logos.full;
                const filename = `logo-${fileIndex++}`;

                console.log(`Processing logo ${fileIndex} of ${count}`);

                manifests.push(manifest);

                manifest.image = filename;
                manifest.slogan = logo.slogan;
                manifest.params = params;

                await LoadAndResizeCanvas(filename, json);
            }
        }

        SaveFile(`manifests.json`, JSON.stringify(manifests));

        console.log('DONE!!');
        return Promise.resolve();
    });
}

(async () => {
    await main();
})();
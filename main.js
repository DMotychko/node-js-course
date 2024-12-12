const fs = require('node:fs/promises');
const path= require('node:path')

const fn = async () => {

    const pathToDir = path.join(process.cwd(), 'baseFolder');
    await fs.mkdir(pathToDir, {recursive: true});

    const dirs = ['folder', 'folder2', 'folder3', 'folder4', 'folder5'];
    const files = ['file.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];

    await Promise.all(dirs.map( async (folder) => {
        const folderPath = path.join(pathToDir, folder);
        await fs.mkdir(folderPath, {recursive: true});

        await Promise.all(files.map(async (file) => {
            await fs.writeFile(path.join(folderPath, file), "Hello node")
        }))
    }))

    const data = await fs.readdir(pathToDir);
    for (const folder of data) {
        folderPath = path.join(pathToDir, folder);
        const files = await fs.readdir(folderPath);
        const stat = await fs.stat(folderPath);
        console.log(`File ${folderPath} is file: ${stat.isFile()}`)
        for (const file of files) {
            const filePath = path.join(folderPath, file)
            const stat = await fs.stat(filePath);
            console.log(`File ${filePath} is file: ${stat.isFile()}`)
        }
    }
}
fn();
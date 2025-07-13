import axios from "axios";

export async function GetMenuManifest() {
    const response = await axios.get("/menu/manifest.json");
    const manifest = response.data;
    return manifest;
}
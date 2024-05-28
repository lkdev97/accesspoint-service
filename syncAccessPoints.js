const axios = require('axios');

const buildingURL = 'http://localhost:32811/calibrationPoints';
const postURL = 'http://localhost:3000/accesspoints';

async function getExistingAccessPoints() {
    try {
        const response = await axios.get(postURL);
        return response.data;
    } catch (error) {
        console.error(`Error while receiving the existing Accespoints from ${postURL}:`, error);
        return [];
    }
}

async function addAccessPoint(accessPoint) {
    try {
        const response = await axios.post(postURL, accessPoint, { headers: { 'Content-Type': 'application/json' }});
        if (response.status === 201) {
            console.log(`Accesspoint added: ${accessPoint.bssid}`);
        }
    } catch (error) {
        console.error(`Error while adding Accesspoint ${accessPoint.bssid}:`, error);
    }
}

async function syncAccessPoints() {
    try {
        const response = await axios.get(buildingURL);
        const data = response.data;
        const existingAccessPoints = await getExistingAccessPoints();
        const existingBSSIDs = new Set(existingAccessPoints.map(ap => ap.bssid));

        const newAccessPoints = [];
        const addedBSSIDs = {}; 

        data.forEach(item => {
            item.fingerprints.forEach(fp => {
                fp.accessPoints.forEach(ap => {
                    if (!existingBSSIDs.has(ap.bssid) && !addedBSSIDs[ap.bssid]) {
                        const accessPoint = {
                            ssid: ap.ssid,
                            bssid: ap.bssid,
                            lat: ap.lat,
                            lng: ap.lng,
                            floor: ap.floor,
                            description: ap.description,
                            building: item.building
                        };
                        newAccessPoints.push(accessPoint);
                        addedBSSIDs[ap.bssid] = true; 
                    }
                });
            });
        });

        for (const ap of newAccessPoints) {
            await addAccessPoint(ap);
        }

        console.log('Synchronizing completed.');
    } catch (error) {
        console.error('Error while synchronizing Accesspoints:', error);
    }
}

syncAccessPoints();
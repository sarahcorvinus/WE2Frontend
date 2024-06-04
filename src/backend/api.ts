// istanbul ignore file -- no coverage, since we would need a running backend for that

import { EintragResource, ProtokollResource } from "../Resources";
import { fetchWithErrorHandling } from "./fetchWithErrorHandling";
import { eintraege, protokolle } from "./testdata";

const HOST = process.env.REACT_APP_API_SERVER_URL;

export async function getAlleProtokolle(): Promise<ProtokollResource[]> {
    if (process.env.REACT_APP_REAL_FETCH!=='true') {
        await new Promise(r => setTimeout(r, 700));
        return Promise.resolve(protokolle);
        
    } else {
        const url = `${HOST}/api/protokoll/alle/`;
        const response = await fetchWithErrorHandling(url)
        return await response.json();
    }
}

export async function getAlleEintraege(protokollId: string): Promise<EintragResource[]> {
    if (process.env.REACT_APP_REAL_FETCH!=='true') {
        await new Promise(r => setTimeout(r, 700));
        return Promise.resolve(eintraege);
    } else {
        const url = `${HOST}/api/protokoll/${protokollId}/eintraege/`;
        const response = await fetchWithErrorHandling(url)
        return await response.json();
    }
}

export async function getProtokoll(protokollId: string): Promise<ProtokollResource> {
    if (process.env.REACT_APP_REAL_FETCH!=='true') {
        await new Promise(r => setTimeout(r, 700));
        return Promise.resolve(protokolle[0]);
    } else {
        const url = `${HOST}/api/protokoll/${protokollId}/`;
        const response = await fetchWithErrorHandling(url)
        return await response.json();
    }
}

export async function getEintrag(eintragId: string): Promise<EintragResource> {
    if (process.env.REACT_APP_REAL_FETCH!=='true') {
        await new Promise(r => setTimeout(r, 700));
        return Promise.resolve(eintraege[0]);
    } else {
        const url = `${HOST}/api/eintrag/${eintragId}/`;
        const response = await fetchWithErrorHandling(url)
        return await response.json();
    }
}
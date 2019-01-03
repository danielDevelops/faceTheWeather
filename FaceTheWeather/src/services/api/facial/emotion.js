// @flow
import axios, { AxiosInstance } from 'axios';
import appConfig from '../../../../app.config';
import RNFetchBlob from 'rn-fetch-blob'

export async function getEmotionFromImage(image: any): Promise<any> {
    try {
        const axiosCall = await makeFetchCall("/face/v1.0/detect", [{key:"returnFaceId",value:"false"},{key:"returnFaceLandmarks",value:"false"},{key:"returnFaceAttributes",value:"age,gender,smile,facialHair,headPose,glasses,emotion,hair,makeup,accessories,blur,exposure,noise" }], image);
        return JSON.stringify(axiosCall);
    }
    catch (exception) {
        if (exception.response)
            return JSON.stringify(exception.response);
        return JSON.stringify(exception);
    }

}

async function makeFetchCall(path: string, additionalParams?: { key: string, value: string }[], data: any): Promise<Response> {
    const baseURL = appConfig.azureCognativeService.uri;
    const azureKey = appConfig.azureCognativeService.key;

    let addParams = '';
    if (additionalParams && additionalParams.length > 0) {
        for (let i = 0; additionalParams.length > i; i++) {
            if (i > 0)
                addParams = `${addParams}&`;
            const item = additionalParams[i];
            addParams = `${addParams}${item.key}=${item.value}`;
        }
    }
    const url = `${baseURL}${path}?${addParams}`;
    const fetchResult = await RNFetchBlob.fetch("POST",
                                    url, 
                                    {
                                        'Content-Type': 'application/octet-stream',
                                        'Ocp-Apim-Subscription-Key': azureKey
                                    },
                                    data);
    return fetchResult.data;
}


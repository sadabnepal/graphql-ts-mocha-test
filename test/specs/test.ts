import { expect } from 'chai';
import { URL } from '../env/manager';
import { graphQlAPI } from '../helper/apiUtils';
import { filterEpisodeByName, filterEpisodeByNumber, getAllEpisodes } from '../queries/episodes';

const getResultsFromBody = (response: any) => {
    return response.body.data.episodes.results;
}

describe('test rick and morty api', () => {

    it('should fetch all episodes data', async () => {
        const response = await graphQlAPI(URL, getAllEpisodes(), { logRequest: true, logResponse: false });
        expect(response.statusCode).equal(200);
    });

    it('should filer by episode number as argument', async () => {
        const response = await graphQlAPI(URL, filterEpisodeByNumber("S01E01"), { logRequest: true, logResponse: true });
        expect(response.statusCode).equal(200);
        expect(getResultsFromBody(response)).to.have.length(1, "expected only one matching results!!")
    });

    it('should filer by episode name as argument', async () => {
        const response = await graphQlAPI(URL, filterEpisodeByName("Total Rickall"), { logRequest: true, logResponse: true });
        expect(response.statusCode).equal(200);
        expect(getResultsFromBody(response)).to.have.length(1, "expected only one matching results!!")
    });

    it('should filer by episode name as argument which does not exist', async () => {
        const response = await graphQlAPI(URL, filterEpisodeByName("random"), { logRequest: true, logResponse: true });
        expect(response.statusCode).equal(200);
        expect(getResultsFromBody(response)).to.have.length(0, "expected no matching results!!")
    });


});
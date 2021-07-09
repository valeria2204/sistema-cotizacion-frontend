import axios from 'axios'
import {URL} from './../config/Config'

function QuotitationService(){
    const getStore = () => {
        return axios({
            method: "GET",
            url:"quotitations"
        }).then(resp => resp.data)
    };

};

export default QuotitationService;

import axios from 'axios';
import DatetimeTool from "../tool/datetime.tool";

export class CreditoDigitalService {

    // static creditoDigitalUrl= 'http://35.211.203.32:5000/credito_digital';
    static creditoDigitalUrl= 'http://davicreditos.ddns.net:5000/credito_digital';

    static general(timeFrame) { //operation COUNT or SUM
        let filter = [];
        if (timeFrame) {
            filter = [
                {
                    'column': 'fecha_desembolso',
                    'comparator': '>=',
                    'value': DatetimeTool.toTimestamp(timeFrame[0])
                },
                {
                    'column': 'fecha_desembolso',
                    'comparator': '<=',
                    'value': DatetimeTool.toTimestamp(timeFrame[1])
                }
            ];
        }

        console.log(JSON.stringify(filter));
        
        return axios.get(this.creditoDigitalUrl,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                params: {
                    'column': 'valor_aprobado',
                    'filter': JSON.stringify(filter)
                }
            })
    }

}
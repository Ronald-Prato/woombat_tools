import axios from 'axios';
import DatetimeTool from "../tool/datetime.tool";

export class FactBancaDigitalService {

    // static factBancaDigitalUrl = 'http://localhost:5000/fact_banca_digital';
    // static factBancaDigitalUrl = 'http://35.211.203.32:5000/fact_banca_digital';
    static factBancaDigitalUrl = 'https://137.116.64.136:5000/fact_banca_digital'; //GOOD ONE
    // static factBancaDigitalUrl = 'https://192.168.68.134:5000/fact_banca_digital';
    // static factBancaDigitalUrl= 'https://137.116.64.136:3000/fact_banca_digital';

    static general(timeFrame, operation, operationColumn) { //operation COUNT or SUM
        let filter = [];
        if (timeFrame) {
            filter = [
                {
                    'column': 'periodo',
                    'comparator': '>=',
                    'value': DatetimeTool.toInt(timeFrame[0])
                },
                {
                    'column': 'periodo',
                    'comparator': '<=',
                    'value': DatetimeTool.toInt(timeFrame[1])
                }
            ];
        }

        console.log(JSON.stringify(filter));

        return axios.get(this.factBancaDigitalUrl,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                params: {
                    'column': 'tipo_producto',
                    'operation': operation,
                    'operation_column': operationColumn,
                    'filter': JSON.stringify(filter)
                }
            })
    }

}

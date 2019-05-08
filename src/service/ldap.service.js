import axios from "axios";

export class LDAPService {

    // static ldapUrl = 'http://davicreditos.ddns.net:5000/ldap';
    // static ldapUrl = 'https://192.168.68.134:5000/ldap'; 
    static ldapUrl = 'https://137.116.64.136:5000/ldap'; //GOOD ONE

    static login(username, password, host) {
        console.log(username);
        return axios.get(this.ldapUrl,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                params: {
                    'username': username,
                    'password': password,
                    'host': host | ''
                }
            })
    }
}

/* eslint-disable no-unused-vars */
import { KJUR, b64utos } from 'jsrsasign';

class VerifyData {
    async verifyData() {
        throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
    }
}

class VerifyData_SupaBase extends VerifyData {
    verifyData(token) {
        return token;
    }
}

class VerifyData_MySql extends VerifyData {
    verifyData(token) {
        return token
    }
}

const SelectedVerifyData = import.meta.env.VITE_USE_MYSQL ? VerifyData_MySql : VerifyData_SupaBase;

export { SelectedVerifyData as VerifyData };

import { KJUR } from 'jsrsasign';

class SignData {
    async signData() {
        throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
    }
}

class SignData_SupaBase extends SignData {
    signData(payload) {
        return payload;
    }
}

class SignData_MySql extends SignData {
    signData(payload) {
        return payload;
    }
}

const SelectedSignData = import.meta.env.VITE_USE_MYSQL ? SignData_MySql : SignData_SupaBase;

export { SelectedSignData as SignData };

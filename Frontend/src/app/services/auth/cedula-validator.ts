import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class CedulaValidatorService {
    validateCedula(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) {
                return null; // No validation error if the field is empty
            }

            const pattern = /^\d{10}$/;
            if (!pattern.test(value)) {
                return { invalidCedulaFormat: true }; // Check for correct format
            }

            const isValidCedula = this.validateCedulaAlgorithm(value);

            return isValidCedula ? null : { invalidCedula: true };
        };
    }

    private validateCedulaAlgorithm(value: string): boolean {
        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let suma = 0;

        for (let i = 0; i < 9; i++) {
            const digito = +value.charAt(i);
            const resultadoParcial = digito * coeficientes[i];

            // Si el resultado parcial es mayor a 9, restarle 9
            suma += resultadoParcial > 9 ? resultadoParcial - 9 : resultadoParcial;
        }

        const totalSuma = suma + +value.charAt(9); // Sumar el último dígito

        // Verificar si el último dígito de la suma total es 0 o calcular el dígito verificador
        const resultado = totalSuma % 10 === 0 ? 0 : 10 - (totalSuma % 10);

        return resultado === +value.charAt(9);
    }
}

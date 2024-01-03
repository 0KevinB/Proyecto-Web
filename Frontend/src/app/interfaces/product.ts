export interface Product {
    BikeID: number;
    Modelo: string;
    Tipo: string;
    Estado: string;
    imagenReferencia: any;
    PrecioPorHora: number;
    Descripcion: string;
    PropietarioBicicletas: any
    CantidadHoras: number; // Nuevo campo para la cantidad de horas seleccionadas
    FechaInicio: Date; // Nueva propiedad para la fecha de inicio del alquiler
    FechaFinalizacion: Date // Nueva propiedad para la fecha de finalización del alquiler
}


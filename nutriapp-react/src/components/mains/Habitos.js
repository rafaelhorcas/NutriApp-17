import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { mock_alimentos_dia } from '../../constants/alimentos_dia';
import { mock_alimentos_dia_anterior1 } from '../../constants/alimentos_dia_-1';
import { mock_alimentos_dia_anterior2 } from '../../constants/alimentos_dia_-2';
import { mock_alimentos_dia_anterior3 } from '../../constants/alimentos_dia_-3';
import { mock_alimentos_dia_anterior4 } from '../../constants/alimentos_dia_-4';

export default function Habitos(){

    const CaloriasConsumidas0 = mock_alimentos_dia.alimentos_dia.reduce((totalKcal, alimento) => {
        return totalKcal + alimento.kcal_totales;
      }, 0);
    const CaloriasConsumidas1 = mock_alimentos_dia_anterior1.alimentos_dia.reduce((totalKcal, alimento) => {
        return totalKcal + alimento.kcal_totales;
      }, 0);
    const CaloriasConsumidas2 = mock_alimentos_dia_anterior2.alimentos_dia.reduce((totalKcal, alimento) => {
        return totalKcal + alimento.kcal_totales;
    }, 0);   
    const CaloriasConsumidas3 = mock_alimentos_dia_anterior3.alimentos_dia.reduce((totalKcal, alimento) => {
        return totalKcal + alimento.kcal_totales;
    }, 0);
    const CaloriasConsumidas4 = mock_alimentos_dia_anterior4.alimentos_dia.reduce((totalKcal, alimento) => {
        return totalKcal + alimento.kcal_totales;
    }, 0);
      
    const CaloriasMedias = (CaloriasConsumidas0 + CaloriasConsumidas1 + CaloriasConsumidas2 + CaloriasConsumidas3 + CaloriasConsumidas4)/5;

    const ProteinasConsumidas0 = mock_alimentos_dia.alimentos_dia.reduce((totalProteinas, alimento) => {
        return totalProteinas + alimento.proteinas_totales;
      }, 0);
    const ProteinasConsumidas1 = mock_alimentos_dia_anterior1.alimentos_dia.reduce((totalProteinas, alimento) => {
        return totalProteinas + alimento.proteinas_totales;
      }, 0);
    const ProteinasConsumidas2 = mock_alimentos_dia_anterior2.alimentos_dia.reduce((totalProteinas, alimento) => {
        return totalProteinas + alimento.proteinas_totales;
    }, 0);   
    const ProteinasConsumidas3 = mock_alimentos_dia_anterior3.alimentos_dia.reduce((totalProteinas, alimento) => {
        return totalProteinas + alimento.proteinas_totales;
    }, 0);
    const ProteinasConsumidas4 = mock_alimentos_dia_anterior4.alimentos_dia.reduce((totalProteinas, alimento) => {
        return totalProteinas + alimento.proteinas_totales;
    }, 0);
      
    const ProteinasMedias = (ProteinasConsumidas0 + ProteinasConsumidas1 + ProteinasConsumidas2 + ProteinasConsumidas3 + ProteinasConsumidas4)/5;


    const CarbohidratosConsumidos0 = mock_alimentos_dia.alimentos_dia.reduce((totalCarbohidratos, alimento) => {
        return totalCarbohidratos + alimento.carbohidratos_totales;
      }, 0);
    const CarbohidratosConsumidos1 = mock_alimentos_dia_anterior1.alimentos_dia.reduce((totalCarbohidratos, alimento) => {
        return totalCarbohidratos + alimento.carbohidratos_totales;
      }, 0);
    const CarbohidratosConsumidos2 = mock_alimentos_dia_anterior2.alimentos_dia.reduce((totalCarbohidratos, alimento) => {
        return totalCarbohidratos + alimento.carbohidratos_totales;
    }, 0);   
    const CarbohidratosConsumidos3 = mock_alimentos_dia_anterior3.alimentos_dia.reduce((totalCarbohidratos, alimento) => {
        return totalCarbohidratos + alimento.carbohidratos_totales;
    }, 0);
    const CarbohidratosConsumidos4 = mock_alimentos_dia_anterior4.alimentos_dia.reduce((totalCarbohidratos, alimento) => {
        return totalCarbohidratos + alimento.carbohidratos_totales;
    }, 0);
      
    const CarbohidratosMedios = (CarbohidratosConsumidos0 + CarbohidratosConsumidos1 + CarbohidratosConsumidos2 + CarbohidratosConsumidos3 + CarbohidratosConsumidos4)/5;

    
    const GrasasConsumidas0 = mock_alimentos_dia.alimentos_dia.reduce((totalGrasas, alimento) => {
        return totalGrasas + alimento.grasas_totales;
      }, 0);
    const GrasasConsumidas1 = mock_alimentos_dia_anterior1.alimentos_dia.reduce((totalGrasas, alimento) => {
        return totalGrasas + alimento.grasas_totales;
      }, 0);
    const GrasasConsumidas2 = mock_alimentos_dia_anterior2.alimentos_dia.reduce((totalGrasas, alimento) => {
        return totalGrasas + alimento.grasas_totales;
    }, 0);   
    const GrasasConsumidas3 = mock_alimentos_dia_anterior3.alimentos_dia.reduce((totalGrasas, alimento) => {
        return totalGrasas + alimento.grasas_totales;
    }, 0);
    const GrasasConsumidas4 = mock_alimentos_dia_anterior4.alimentos_dia.reduce((totalGrasas, alimento) => {
        return totalGrasas + alimento.grasas_totales;
    }, 0);
      
    const GrasasMedias = (GrasasConsumidas0 + GrasasConsumidas1 + GrasasConsumidas2 + GrasasConsumidas3 + GrasasConsumidas4)/5;


    return (
        <div className="text">
              <p>Calorías consumidas: {CaloriasMedias} kcal</p>
              <p>Proteinas: {ProteinasMedias} g</p>
              <p>Carbohidratos: {CarbohidratosMedios} g</p>
              <p>Grasas: {GrasasMedias} g</p>
        </div>
         
    );
}
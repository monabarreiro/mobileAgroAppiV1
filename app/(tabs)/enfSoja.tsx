import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';


export default function EnfSoja() {
const [mostrarEnfermedad1, setMostrarEnfermedad1] = React.useState(false);
const [mostrarEnfermedad2, setMostrarEnfermedad2] = React.useState(false);
const [mostrarEnfermedad3, setMostrarEnfermedad3] = React.useState(false);
const [mostrarEnfermedad4, setMostrarEnfermedad4] = React.useState(false);

  return (
    <ScrollView  contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 50 }}>
    
      <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}
      >Enfermedades de la Soja</Text>
      <TouchableOpacity style={{ backgroundColor: '#b6eab8ff', padding: 10, borderRadius: 5 }} onPress={() => setMostrarEnfermedad1(!mostrarEnfermedad1)}>
        <Text style={{ fontSize: 18 ,fontWeight: 'bold'}}>1. Blight — Tizón foliar del maíz</Text>
        {mostrarEnfermedad1 && (
          <Text style={{ marginTop: 10 }}>
    •Definición y agente causal: {"\n"}
    Enfermedad foliar causada típicamente por el hongo Exserohilum turcicum (NCLB). {"\n"}
    Produce lesiones alargadas, en forma de cuchilla.{"\n"}
•	Síntomas y características:{"\n"}
{"\n"}
Lesiones largas, alargadas (2–15 cm), gris o pardo grisáceo, a menudo paralelas a la nervadura de la hoja.{"\n"}
En condiciones severas puede afectar gran parte del follaje, reducir fotosíntesis y rendimiento.{"\n"}
Favorecida por temperaturas templadas (20–28 °C) y humedad prolongada/rocío.{"\n"}
{"\n"}
•	Manejo en campo:{"\n"}
{"\n"}
Uso de híbridos resistentes/tolerantes (consulta catálogos de semilleros locales).{"\n"}
Rotación de cultivo (evitar maíz después de maíz) para reducir inóculo en rastrojos.{"\n"}
Manejo de rastrojos: labranza o enterrado de residuos donde sea factible para reducir el inóculo.{"\n"}
Siembra con densidades y fechas que eviten periodos de humedad prolongada en estadios críticos.{"\n"}
Manejo equilibrado de la fertilización (evitar exceso de N que promueva follaje denso).{"\n"}
Monitoreo y seguimientos periódicos; {"\n"}
aplicar fungicida cuando la enfermedad aparece tempranamente y progresa hacia estadio crítico {"\n"}
(por ejemplo en etapas vegetativas tardías/p antes de formación de mazorca si el riesgo {"\n"}
y el nivel de enfermedad lo justifican).
{"\n"}
Manejo químico en mezcla con prácticas culturales; respetar intervalos y dosis de etiqueta. {"\n"}
{"\n"}
•	Ingredientes activos y ejemplos comerciales (ejemplos de marcas y empresas):{"\n"}
o	QoI (strobilurinas): azoxystrobin — ejemplo: Quadris (Syngenta).{"\n"}
o	QoI: pyraclostrobin — Headline (BASF).{"\n"}
o	DMI (triazoles): propiconazole — ventas bajo distintos nombres comerciales (varios formuladores,{"\n"}
 p. ej. presentaciones de Syngenta y otros); tebuconazole — Folicur (Bayer).{"\n"}
o	SDHI y mezclas: fluxapyroxad + pyraclostrobin — Priaxor (BASF).{"\n"}
o	Contacto multisito: chlorothalonil — Bravo (Syngenta); Mancozeb — Dithane u otras marcas {"\n"}
(varios fabricantes como Corteva y formuladores regionales).{"\n"}
o	Productores/empresas globales relevantes: Syngenta, BASF, Bayer, Corteva, FMC, UPL (entre otras).{"\n"}
</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#99e89cff', padding: 10, borderRadius: 5 }} onPress={() => setMostrarEnfermedad2(!mostrarEnfermedad2)}>

        <Text style={{ fontSize: 18 ,fontWeight: 'bold'}}>2. Common Rust — Roya común</Text>
        {mostrarEnfermedad2 && (
          <Text style={{ marginTop: 10 }}>
    •	Definición y agente causal: {"\n"}
    Enfermedad foliar causada por el hongo Puccinia sorghi. {"\n"}
    Produce pústulas de color óxido (pústulas) en ambas superficies de la hoja.{"\n"}
    •	Síntomas y características: {"\n"}
o	Pústulas pulverulentas redondas u ovales, de color naranja a rojizo; {"\n"}
pueden volverse oscuras con la edad.{"\n"}
o	Generalmente aparece en condiciones más cálidas y húmedas; {"\n"}
es común en etapas medias del cultivo.{"\n"}
o	Suelen ser menos destructivas que otras enfermedades foliares {"\n"}
salvo cuando son muy severas o ocurren tempranamente.{"\n"}
{"\n"}
•	Manejo en campo (IPM):{"\n"}
{"\n"}

o	Uso de híbridos con tolerancia/resistencia.{"\n"}
o	Monitoreo: en muchas regiones la roya no requiere fungicida salvo {"\n"}
cuando hay alta presión temprana o cuando coincide con etapas críticas de desarrollo.{"\n"}
o	Siembra en fechas que reduzcan la exposición a condiciones favorables para el hongo.{"\n"}
o	El control cultural (rotación, manejo de residuos){"\n"}
 ayuda aunque las esporas pueden venir de cultivos vecinos o vientos.{"\n"}
o	Aplicación de fungicidas cuando la enfermedad es severa {"\n"}
y amenaza rendimiento; priorizar mezcla de modos de acción. {"\n"}
{"\n"}
•	Ingredientes activos y ejemplos comerciales:
{"\n"}
o	QoI (strobilurinas): azoxystrobin — Quadris (Syngenta); pyraclostrobin — Headline (BASF).{"\n"}

o	DMI (triazoles): tebuconazole (Folicur, Bayer); propiconazole (presentaciones diversas). {"\n"}

o	Mezclas SDHI+QoI: Priaxor (BASF) — usado en manejo de roya en muchos cultivos.{"\n"}

o	Contacto: chlorothalonil (Bravo, Syngenta) puede ayudar como preventivo.{"\n"}

o	Empresas: Syngenta, BASF, Bayer, Corteva, FMC, UPL, etc. {"\n"}
{"\n"}

•	Observación: la roya tiende a responder bien a fungicidas QoI/DMI, pero se debe manejar la resistencia rotando modos de acción.

        </Text>)}
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#84ec88ff', padding: 10, borderRadius: 5 }} onPress={() => setMostrarEnfermedad3(!mostrarEnfermedad3)}>
        <Text style={{ fontSize: 18 ,fontWeight: 'bold'}}>3. Gray Leaf Spot — Mancha gris del maíz</Text>
        {mostrarEnfermedad3 && (
          <Text style={{ marginTop: 10 }}>
    •	Definición y agente causal: {"\n"}
    Enfermedad foliar causada por el hongo Cercospora zeae-maydis. {"\n"}
    Produce lesiones rectangulares, de color gris a marrón oscuro, paralelas a las nervaduras de la hoja.{"\n"}
    •	Síntomas y características: {"\n"}
o	Manchas angostas y rectangulares que siguen las nervaduras de la hoja; {"\n"}
color gris a pardo grisáceo; en ataques severos las hojas se agrietan y mueren.{"\n"}
o	Favorecida por calor moderado a alto y alta humedad/rocío prolongado;{"\n"}
 el inóculo sobrevive en rastrojos.{"\n"}
o	Puede causar pérdidas significativas si la enfermedad {"\n"}
se generaliza antes o durante el llenado de grano.{"\n"}
{"\n"}
•	Manejo en campo (IPM): {"\n"}
{"\n"}
o	Rotación de cultivo (maíz/soja o otros) para reducir rastrojos infectados.{"\n"}
o	Reducción de rastrojos (labranza) donde sea apropiado para disminuir inóculo. {"\n"}
o	Uso de híbridos con tolerancia (consultar catálogos/ensayos locales).{"\n"}
o	Evitar fechas de siembra que coincidan con condiciones muy favorables; {"\n"}
densidades altas y excesivo nitrógeno pueden incrementar severidad.{"\n"}
o	Monitoreo y toma de decisión basada en niveles de enfermedad, {"\n"}
estadío de cultivo y riesgo; tratamientos foliares son efectivos {"\n"}
si se aplican con antelación a la progresión severa (estadios reproductivos críticos).{"\n"}

•	Ingredientes activos y ejemplos comerciales: {"\n"}
{"\n"}

o	QoI: azoxystrobin (Quadris, Syngenta), pyraclostrobin (Headline, BASF).{"\n"}
o	DMI: propiconazole, tebuconazole (Folicur, Bayer).{"\n"}
o	Mezclas SDHI+QoI o SDHI+DMI: Priaxor (BASF) — mezclas que ofrecen mayor duración y control.{"\n"}
o	Contacto/multi-sitio: chlorothalonil (Bravo, Syngenta); {"\n"}
mancozeb (Dithane, etc.) como componentes preventivos o mezclas.{"\n"}
o	Empresas: Syngenta, BASF, Bayer, Corteva, FMC, UPL, etc. {"\n"}

•	Observación: Gray leaf spot tiene fuerte dependencia de inóculo en rastrojo; medidas culturales son especialmente importantes.

        </Text>)}
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#75ea9eff', padding: 10, borderRadius: 5 }} onPress={() => setMostrarEnfermedad4(!mostrarEnfermedad4)}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>4. Healthy - Saludable</Text>
        {mostrarEnfermedad4 && (
          <Text style={{ marginTop: 10 }}>
    •	Definición: {"\n"}
    Planta de maíz sin signos visibles de enfermedades foliares. {"\n"}
    Hojas verdes, sin manchas, lesiones o decoloraciones.{"\n"}
    •	Recomendaciones para mantener el cultivo sano: {"\n"}
o	Selección de híbridos resistentes/tolerantes apropiados a la región.{"\n"}
o	Rotación de cultivos y manejo de rastrojos para reducir inóculo.{"\n"}
o	Fertilización balanceada (evitar exceso de nitrógeno justo antes de periodos de alta humedad),{"\n"}
 aplicar mediante análisis de suelo y recomendaciones locales.{"\n"}
o	Manejo adecuado del riego/aspersión para minimizar periodos largos de humedad foliar.{"\n"}
o	Siembra a la densidad y fecha recomendadas para la región. {"\n"}
o	Monitoreo regular (vigilancia) {"\n"}
y toma de decisiones basadas en umbrales y pronósticos climáticos/enfermedades.{"\n"}
o	Uso responsable de fungicidas y mezcla/rotación de modos de acción para evitar resistencias.{"\n"}
{"\n"}
•	Fertilizantes y empresas (ejemplos):{"\n"}

o	Fertilizantes nitrogenados y de base para manejo nutricional: 
urea, UAN, nitrato amónico — empresas: Yara, Nutrien, The Mosaic Company, EuroChem, ICL. {"\n"}

o	Micro y macronutrientes foliares/edaficos (Zn, B, S, etc.) {"\n"}
 producidos por Yara, Haifa, ICL, Corteva (formuladores), entre otros. {"\n"}
 {"\n"}
o	Nota: la corrección nutricional puede fortalecer la planta {"\n"}
y reducir susceptibilidad, pero no sustituye medidas fitosanitarias. {"\n"}
Consejos prácticos y consideraciones finales {"\n"}
•	Siempre seguir la etiqueta del producto, las dosis, los intervalos de seguridad y la normativa local.{"\n"}


        </Text>)}
      </TouchableOpacity>
 
    </ScrollView>
  );
}


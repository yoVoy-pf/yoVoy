import { sequelize } from '../src/db';

const organization = [
	{ name: 'La esquina' },
	{ name: 'Baldosas rojas' },
	{ name: 'Voz en off' },
	{ name: 'Vestido de verano' },
	{ name: 'Taller de muñecas' },
	{ name: 'Museo Medea' },
	{ name: 'Porcelana China' },
	{ name: 'Minuto 15' },
	{ name: 'La llamada' },
	{ name: 'LaTyna' },
];

const locations = [
	// San Juan
	{ name: 'Teatro del Bicentenario', address: 'Las Heras Sur 430', latitude: -31.540239738417892 ,longitude: -68.5359782260676 ,  cityId:1},
	{ name: 'Auditorio Juan Victoria', address: '25 de Mayo Oeste 1215', latitude: -31.529590479241733 ,longitude: -68.5433925672192 ,  cityId:1},
	{ name: 'Estadio Aldo Cantoni', address: 'C. San Luis Oeste 1300', latitude: -31.531738484136007 ,longitude: -68.54451878500541 ,  cityId:1},
	{ name: 'Teatro Sarmiento', address: '99 J5400DUA, Avenida Leandro N. Alem Norte 1', latitude: -31.53392923013056,longitude: -68.53162511305565 ,  cityId:1},
	{ name: 'Teatro Municipal de San Juan', address: 'Mitre Antes De Circunvalacion 99', latitude: -31.53788433734873 ,longitude: -68.52499847165866 ,  cityId:1},
	{ name: 'Anfiteatro Centro Cultural Estación San Martín', address: 'Av. José Ignacio de la Roza Oeste 712-774', latitude: -31.537940632640336 ,longitude: -68.5367406799621 ,  cityId:1},
	//Mendoza
	{ name: 'Teatro Mendoza', address: 'San Juan 1427', latitude:-32.88684209139301 ,longitude:-68.83673196183025 ,  cityId:2},
	{ name: 'Teatro Independencia', address: 'Chile 1184, M5500 GRM', latitude:-32.8883770342279 ,longitude:-68.84608980231017 ,  cityId:2},
	{ name: 'TEATRO SELECTRO', address: 'Cap. de Fragata Moyano 102', latitude:-32.90098433620503,longitude:  -68.84323534278975 ,  cityId:2},
	{ name: 'Teatro Enkosala Gladys Ravalle', address: 'Almte. Brown 755', latitude:-32.91630983193671 ,longitude: -68.8479390869672 ,  cityId:2},
	{ name: 'Cine Teatro Plaza', address: 'Colón 27', latitude: -32.924972002483045 ,longitude: -68.84499362559798 ,  cityId:2},
	{ name: 'Teatro Municipal Julio Quintanilla', address: 'Av. Sarmiento, M5500 Ciudad, Mendoza', latitude:-32.888973845747614 ,longitude:-68.84390851300329 ,  cityId:2},
	{ name: 'Teatro el Taller Centro Cultural', address: 'Granaderos 1964', latitude: -32.877188943510504 ,longitude: -68.8548090099366 ,  cityId:2},
	//La Pampa
	{ name: 'Teatro Español', address: 'ASB, Hilario Lagos 44', latitude:-36.61879590784061 ,longitude:-64.2906215811911 ,  cityId:5},
	{ name: 'Teatro TKQ', address: 'Sarmiento 495', latitude:-36.61768385170393 ,longitude: -64.29760997128629 ,  cityId:5},
	{ name: 'Anfiteatro del Centro Cívico', address: 'Padre Buodo, San Pedro &, Santa Rosa, La Pampa', latitude: -36.621421887018904,longitude: -64.2784975759854 ,  cityId:5},
	{ name: 'Teatro Attp', address: 'Bolivia 1286, L6300 GDO', latitude: -36.63111598535499,longitude: -64.29884686354507 ,  cityId:5},
	//La Rioja
	{ name: 'Teatro de la Ciudad', address: 'Direccion de Rentas Municipal, Pje. Calchaquí 1 26', latitude:-29.412720277674723 ,longitude: -66.85128637144672 ,  cityId:7},
	{ name: 'Teatro Provincial Víctor María Cáceres', address: 'F5302 La Rioja', latitude:-29.431085520363048,longitude: -66.85943932598066  ,  cityId:7},
	{ name: 'Teatro La Kanoa De Papel', address: 'Calle Dr. Juan Olsacher 2680', latitude:-29.441067383348155 ,longitude: -66.85488484779415 ,  cityId:7},
	//Entre Rios
	{ name: 'Teatro 3 de Febrero', address: 'FGB, 25 de Junio 54, E3100 Paraná, Entre Ríos', latitude:-31.731023925824836 ,longitude:-60.53041079751662 ,  cityId:20},
	{ name: 'Teatro Multimedia del Circulo', address: 'FFA, Gral. Justo José de Urquiza 1135', latitude:-31.731608786939006 ,longitude:-60.53193034267578 ,  cityId:20},
	{ name: 'Arteatro', address: 'Tucumán 378', latitude:-31.72601094093101 ,longitude:-60.53337208308685 ,  cityId:20},
	//Santiago del Estero
	{ name: 'Teatro los Cabezone', address: 'G4204 Ciudad de Santiago del Estero, Santiago del Estero', latitude:-27.78847476629992,longitude:-64.25795957392262,  cityId:9},
	{ name: 'LA Buenos Aires Espacio Cultural', address: 'Buenos Aires 170, Santiago del Estero', latitude:-27.787544592340243 ,longitude:-64.25710126707747 ,  cityId:9},
	{ name: 'Teatro 25 De Mayo', address: 'Avellaneda 376, Santiago del Estero', latitude:-27.78655508938279 ,longitude:-64.25677119979443 ,  cityId:9},
	// Tierra del Fuego
	{ name: 'Tierra de Teatro', address: 'Dr. Albert Schweitzer 1300-1335, Río Grande, Tierra del Fuego', latitude:-53.788432442402346,longitude:-67.72524428292382 ,  cityId: 10},
	{ name: 'Dionisio Teatro', address: 'El Alambrador 853, Río Grande, Tierra del Fuego', latitude:-53.80516210945429 ,longitude:-67.68009734286923 ,  cityId: 10},
	{ name: 'Casa de la Cultura', address: 'Sebastián Elcano 179, V9420 Río Grande, Tierra del Fuego', latitude:-53.78694323724804 ,longitude:-67.69201806803937 ,  cityId: 10},
	// Chaco
	{ name: 'La Mascara - Espacio cultural y de formación', address: 'av. dr. evaristo ramirez, Nikola Tesla &, Resistencia, Chaco', latitude:-27.46759783397431,longitude:-58.98424333951735 ,  cityId:19},
	{ name: 'Teatro Libertad', address: 'DDC Pasaje, Los Hacheros 2174,', latitude:-27.476501194014624 ,longitude: -58.99710667923666 ,  cityId:19},
	{ name: 'Galatea', address: 'BEL, Mendoza 590, H3500BEL Resistencia, Chaco', latitude:-27.451955588897707,longitude:-58.997749403129596  ,  cityId:19},
	//Catamarca
	{ name: 'Cine Teatro Catamarca', address: 'San Martín 515-591, San Fernando del Valle de Catamarca, Catamarca', latitude:-28.469559098560897 ,longitude: -65.77895881662907,  cityId:18},
	{ name: 'Teatro del Sur', address: 'Florida 600-698, San Fernando del Valle de Catamarca, Catamarca', latitude:-28.47959758725499 ,longitude:-65.77696802770262 ,  cityId:18},
	{ name: 'Complejo Cultural Urbano Girardi', address: ' Av. Enrique Ocampo 58-98, San Fernando del Valle de Catamarca, Catamarca', latitude: -28.47018841800659 ,longitude: -65.78752305648395 ,  cityId:18},
	//San Luis
	{ name: 'Sala Hugo del Carril', address: 'Pasaje de las Artes, Av. del Fundador y, San Luis', latitude:-33.293273738622 ,longitude:-66.30915513787068 ,  cityId:13},
	{ name: 'Espacio cultural - Teatro club social', address: 'Av. Sucre, San Luis', latitude:-33.276037196049174 ,longitude:-66.33599247331941 ,  cityId:13},
	{ name: 'TEA Teatro Estudio Arte', address: 'AJT, 9 de Julio 1431, D5700 D5700AJT, San Luis', latitude:-33.307848687455696 ,longitude:-66.34268664270638 ,  cityId:13},
	//Santa Cruz
	{ name: 'TEATRO SOCIEDAD ESPAÑOLA', address: 'San Martin & Sarmiento, Puerto Santa Cruz, Santa Cruz', latitude:-50.01758179062568 ,longitude:-68.52152396142064 ,  cityId:12},
	{ name: 'Sala LibélulaSur Teatro', address: 'Pje. 115, El Calafate, Santa Cruz', latitude:-50.349020665006336 ,longitude:-72.25838552038572 ,  cityId:12},
	{ name: 'El Portal Rojo', address: 'Valentín Feilberg 359, El Calafate, Santa Cruz', latitude:-50.34307239681722 ,longitude:-72.2681834752031 ,  cityId:12},
	//Chubut
	{ name: 'Teatro Verdi', address: 'San Martín 128, Trelew, Chubut', latitude:-43.25326649865176 ,longitude:-65.3074302585495 ,  cityId:11},
	{ name: 'Teatro Español', address: '25 de Mayo 237, Trelew, Chubut', latitude:-43.25241784144381 ,longitude:-65.30956668847155 ,  cityId:11},
	{ name: 'Centro Cultural El Árbol', address: '798, Ameghino 700, Trelew, Chubut', latitude:-43.259511496502824 ,longitude:-65.31099073965534 ,  cityId:11},
	//Neuquen
	{ name: 'EL ARRIMADERO', address: 'Misiones 234, Neuquén', latitude:-38.95740435629737,longitude:-68.06341573787257 , cityId:21},
	{ name: 'Teatro Desafio', address: 'Padre Brentana José, Neuquén', latitude:-38.95448175382361 ,longitude: -68.07172661174937,  cityId:21},
	{ name: 'Sala Teatral Patagonica Daniel Vitulich', address: 'Gdor. Anaya 299-399, Q8300 Neuquén', latitude:-38.95807967788367 ,longitude:-68.08450330658707 ,  cityId:21},
	//Rio negro
	{ name: 'Teatro Las Grutas', address: 'Peatonal Viedma Shopping Puertas al Sol, R8521 Las Grutas, Río Negro', latitude:-40.81068981205803 ,longitude:-65.08867130214848,  cityId:22},
	{ name: 'Cine teatro', address: 'Av. San Martin, Gral. Conesa, Río Negro', latitude:-40.10415426378109 ,longitude:-64.4551215386104 ,  cityId:22},
	{ name: 'Casa de la Historia y de la Cultura del Bicentenario Presidente Nestor Kirchner', address: 'Las Grutas, Río Negro', latitude:-40.81124825693792 ,longitude:-65.08856220727927 ,  cityId:22},
	//Corrientes
	{ name: 'TU Aroma', address: 'ruta 5km 2.5, W3400 Corrientes', latitude:-27.469131936346756 ,longitude:-58.83054976394837 ,  cityId:15},
	{ name: 'Teatro De La Biblioteca Mariño', address: 'Sta. Fé 847, Corrientes', latitude:-27.46755172765518 ,longitude:-58.83030300073039 ,  cityId:15},
	{ name: 'Sala Skené', address: 'San Martín 830, Corrientes', latitude:-27.469849608971312 ,longitude:-58.83984117866317 ,  cityId:15},
	//Misiones
	{ name: 'Teatro Sala Tempo', address: '3 de Febrero 1916, Posadas, Misiones', latitude:-27.368300374869026 ,longitude:-55.89069214009139 ,  cityId:14},
	{ name: 'Centro Cultural Comunitario "El Galpón" de la Murga de la Estación', address: 'Pedro Mendez 2260, N3300 Posadas, Misiones', latitude:-27.376219281992572 ,longitude:-55.89953367189851 ,  cityId:14},
	{ name: 'Teatro de Los Cajones', address: 'Av. Aconcagua 652, N3328 Jardín America, Misiones', latitude:-27.037784255047153 ,longitude:-55.22874521112201 ,  cityId:14},
	//Tucuman
	{ name: 'Sala Bicentenario', address: 'Laprida 55-99, T4000 San Miguel de Tucumán, Tucumán', latitude:-26.830441850950763 ,longitude:-65.20306114819944 ,  cityId:16},
	{ name: 'Teatro Mercedes Sosa', address: 'Gral. José de San Martín 479, San Miguel de Tucumán, Tucumán', latitude:-26.82952322228536 ,longitude:-65.20401723640188 ,  cityId:16},
	{ name: 'Sala Miguel Ángel Estrella', address: 'Virgen de la Merced 157, San Miguel de Tucumán, Tucumán', latitude:-26.829524206618423 ,longitude:-65.20107875142412 ,  cityId:16},
	//Salta
	{ name: 'Encuentro de Danza-Teatro en el Noa', address: 'Almte. Brown 241 7"C, A4400 Salta', latitude:-24.785984768700978 ,longitude:-65.42186851681228 ,  cityId:23},
	{ name: 'Salón Auditorium Dr. Rafael Villagrán', address: 'Av. Belgrano 1349, A4400 Salta', latitude:-24.786667886522686 ,longitude:-65.42124229399552 ,  cityId:23},
	{ name: 'Teatro Iglesia San Alfonso', address: 'Leguizamón 800-812, Salta', latitude:-24.78339521236342 ,longitude:-65.41354487627437 ,  cityId:23},
	//Santa Fe
	{ name: 'Teatro de la Abadia', address: 'DNK, Estanislao Zeballos, S3004 Santa Fe', latitude:-31.60396440723277 ,longitude:-60.700466038422995 ,  cityId:24},
	{ name: 'Teatro Luz Y Fuerza', address: 'Junín 2957, S3000 Santa Fe', latitude:-31.637960576752437 ,longitude:-60.708907609156,  cityId:24},
	{ name: 'Teatro Musical', address: '25 de Mayo 3041, S3000 Santa Fe', latitude: -31.640611010606133,longitude:-60.70405926227226 ,  cityId:24},
	//Córdoba
	{ name: 'Sala Quinto Deva', address: 'Pje. Agustín Pérez 10, Córdoba', latitude:-31.405457487878763 ,longitude:-64.17767051098895 ,  cityId:3},
	{ name: 'Teatro La Brújula', address: 'Rivadavia 1452, Córdoba', latitude:-31.401679161086154 ,longitude:-64.17616546618952 ,  cityId:3},
	{ name: 'Teatro la Chacarita', address: 'Jacinto Ríos 1449, X5000 Córdoba', latitude:-31.400733764023006,longitude:-64.17087013638705  ,  cityId:3},
	//CABA
	{ name: 'Teatro Gran Rex', address: 'Av. Corrientes 857, CABA', latitude:-34.603377149259636 ,longitude:-58.378862531859696 , cityId:17},
	{ name: 'Luna Park', address: 'Av. Eduardo Madero 470, CABA', latitude:-34.602160622339845,longitude:-58.368415641704345 , cityId:17},
	{ name: 'Centro Costa Salguero', address: 'Av. Costanera Rafael Obligado 1221, CABA', latitude:-34.57057510275868 ,longitude:-58.39641863978152 ,  cityId:17},
	//Bs as
	{ name: 'Estadio Único Diego Armando Maradona', address: 'Av. 25, B1900 La Plata, Provincia de Buenos Aires', latitude:-34.91382042119327 ,longitude:-57.98912717807837 ,  cityId:6},
	{ name: 'Estadio José Amalfitani', address: 'Av. Juan B. Justo 9200, C1408AKU CABA', latitude:-34.635379517410115 ,longitude:-58.52071289325334 ,  cityId:6},
	{ name: 'Teatros Atlas y América', address: 'Micro Centro, Av. Pedro Luro, B7600 Mar del Plata, Provincia de Buenos Aires', latitude:-37.999932350094646 ,longitude:-57.54288642998611 ,  cityId:6},
	//Jujuy
	{ name: 'Estadio 23 de Agosto', address: 'Santa Barbara S/N, Humahuaca esq, San Salvador de Jujuy, Jujuy', latitude:-24.198455238981808,longitude:-65.29086960674667 ,  cityId:8},
	{ name: 'Cine Teatro Municipal SELECT', address: 'Gral. Alvear 665, Y4600 San Salvador de Jujuy, Jujuy', latitude:-24.18398082556901 ,longitude:-65.30230526011998 ,  cityId:8},
	{ name: 'Teatro Mitre', address: 'Gral. Alvear 1009, Y4600 San Salvador de Jujuy, Jujuy', latitude:-24.1841367560645 ,longitude:-65.30706345522228 ,  cityId:8},
	//Formosa
	{ name: 'Teatro de la Ciudad', address: 'España, P3600 Formosa', latitude:-26.183669209225098 ,longitude:-58.175306923293114 ,  cityId:4},
	{ name: 'Gran Cine - Teatro "Italia"', address: 'Av. 25 de Mayo 383, P3600ABX Formosa', latitude:-26.182865861406437 ,longitude:-58.1684894704376 ,  cityId:4},
	{ name: 'LaCasa Vieja', address: 'Jonas Salk 426, Formosa', latitude:-26.17073133626852 ,longitude:-58.1749962368066 ,  cityId:4},
];

let events = [
	{
		name: 'Smiling Lieutenant, The',
		description:
			'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
		organizationId: 8,
	},
	{
		name: "It All Starts Today (Ça commence aujourd'hui)",
		description:
			'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
		organizationId: 8,
	},
	{
		name: "April Fool's Day",
		description:
			'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
		organizationId: 7,
	},
	{
		name: 'Magnificent Obsession',
		description:
			'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
		organizationId: 1,
	},
	{
		name: 'My Kid Could Paint That',
		description:
			'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
		organizationId: 5,
	},
	{
		name: 'Return to Never Land',
		description:
			'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
		organizationId: 7,
	},
	{
		name: 'Isadora',
		description:
			'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
		organizationId: 2,
	},
	{
		name: 'Pursuit of Happyness, The',
		description:
			'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
		organizationId: 4,
	},
	{
		name: 'Black Magic Rites & the Secret Orgies of the 14th Century (Riti, magie nere e segrete orge nel trecento...)',
		description:
			'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
		organizationId: 3,
	},
	{
		name: 'Seas Beneath',
		description:
			'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
		organizationId: 2,
	},
	{
		name: 'Contraband',
		description:
			'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
		organizationId: 3,
	},
	{
		name: 'Inside Paris (Dans Paris)',
		description:
			'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		organizationId: 1,
	},
	{
		name: 'Show of Force, A',
		description:
			'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
		organizationId: 4,
	},
	{
		name: 'Don',
		description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
		organizationId: 4,
	},
	{
		name: 'Hypnotist, The (Hypnotisören)',
		description:
			'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
		organizationId: 5,
	},
	{
		name: 'Next Door (Naboer)',
		description:
			'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
		organizationId: 6,
	},
	{
		name: 'Glee: The 3D Concert Movie',
		description:
			'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
		organizationId: 5,
	},
	{
		name: 'Jack Frost',
		description:
			'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
		organizationId: 8,
	},
	{
		name: 'Ghost Story',
		description:
			'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
		organizationId: 5,
	},
	{
		name: 'The Gang That Sold America',
		description:
			'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
		organizationId: 6,
	},
	{
		name: 'Together Again',
		description:
			'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
		organizationId: 6,
	},
	{
		name: 'Never Make It Home',
		description:
			'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
		organizationId: 1,
	},
	{
		name: 'Adanggaman',
		description:
			'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
		organizationId: 1,
	},
	{
		name: '29th Street',
		description:
			'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
		organizationId: 8,
	},
	{
		name: 'Scream 2',
		description:
			'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
		organizationId: 4,
	},
	{
		name: 'Higher Learning',
		description:
			'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
		organizationId: 7,
	},
	{
		name: 'Passengers',
		description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
		organizationId: 3,
	},
	{
		name: 'Darkman',
		description:
			'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
		organizationId: 3,
	},
	{
		name: 'Fanny and Alexander (Fanny och Alexander)',
		description:
			'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
		organizationId: 1,
	},
	{
		name: 'Snowblind',
		description:
			'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		organizationId: 6,
	},
	{
		name: 'Victim',
		description:
			'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
		organizationId: 5,
	},
	{
		name: 'Exit Through the Gift Shop',
		description:
			'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
		organizationId: 7,
	},
	{
		name: 'Run, Man, Run! (Corri uomo corri)',
		description:
			'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
		organizationId: 3,
	},
	{
		name: 'Pekka ja Pätkä neekereinä',
		description:
			'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
		organizationId: 1,
	},
	{
		name: 'Thing from Another World, The',
		description: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
		organizationId: 8,
	},
	{
		name: 'Lesser Blessed, The',
		description:
			'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
		organizationId: 8,
	},
	{
		name: 'Breakfast Club, The',
		description:
			'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
		organizationId: 1,
	},
	{
		name: 'Unfaithfully Yours',
		description:
			'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
		organizationId: 2,
	},
	{
		name: 'Spy Who Loved Me, The',
		description:
			'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
		organizationId: 8,
	},
	{
		name: 'Hatchet for the Honeymoon (Rosso segno della follia, Il)',
		description:
			'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
		organizationId: 10,
	},
	{
		name: "Army of Shadows (L'armée des ombres)",
		description:
			'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
		organizationId: 10,
	},
	{
		name: "For Roseanna (Roseanna's Grave)",
		description:
			'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
		organizationId: 7,
	},
	{
		name: 'Sonatine (Sonachine)',
		description:
			'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
		organizationId: 6,
	},
	{
		name: 'Gamera vs. Guiron',
		description:
			'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
		organizationId: 2,
	},
	{
		name: 'My Kidnapper',
		description:
			'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
		organizationId: 7,
	},
	{
		name: 'Frankenstein Meets the Wolf Man',
		description:
			'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
		organizationId: 1,
	},
	{
		name: 'Tap',
		description:
			'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
		organizationId: 5,
	},
	{
		name: 'Chattahoochee',
		description:
			'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
		organizationId: 4,
	},
	{
		name: 'Black and White in Color (Noirs et blancs en couleur)',
		description:
			'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
		organizationId: 6,
	},
	{
		name: 'Hardcore',
		description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
		organizationId: 5,
	},
	{
		name: 'Older Brother, Younger Sister (Ani imôto)',
		description:
			'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
		organizationId: 10,
	},
	{
		name: 'Sunday in the Country, A (Un dimanche à la campagne)',
		description:
			'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
		organizationId: 4,
	},
	{
		name: 'Elephant Man, The',
		description:
			'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
		organizationId: 1,
	},
	{
		name: 'Long, Long Trailer, The',
		description:
			'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
		organizationId: 5,
	},
	{
		name: 'Being There',
		description:
			'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
		organizationId: 2,
	},
	{
		name: 'Singh Is Kinng',
		description:
			'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
		organizationId: 10,
	},
	{
		name: 'Tron',
		description:
			'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
		organizationId: 8,
	},
	{
		name: 'Dallas: War of the Ewings',
		description:
			'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
		organizationId: 4,
	},
	{
		name: 'The Expedition to the End of the World',
		description:
			'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
		organizationId: 5,
	},
	{
		name: 'Extraordinary Adventures of Mr. West in the Land of the Bolsheviks, The (Neobychainye priklyucheniya mistera Vesta v strane bolshevikov)',
		description:
			'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
		organizationId: 7,
	},
	{
		name: 'Inherit the Wind',
		description:
			'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
		organizationId: 5,
	},
	{
		name: 'No God, No Master',
		description:
			'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
		organizationId: 7,
	},
	{
		name: 'Scorned',
		description:
			'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
		organizationId: 8,
	},
	{
		name: 'Blossoms in the Dust',
		description:
			'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
		organizationId: 3,
	},
	{
		name: 'Philosophers, The (After The Dark)',
		description:
			'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
		organizationId: 4,
	},
	{
		name: 'Company of Wolves, The',
		description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
		organizationId: 10,
	},
	{
		name: 'Life with Father',
		description:
			'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
		organizationId: 3,
	},
	{
		name: 'FM',
		description:
			'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
		organizationId: 1,
	},
	{
		name: 'Garden of the Finzi-Continis, The (Giardino dei Finzi-Contini, Il)',
		description:
			'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
		organizationId: 4,
	},
	{
		name: 'Martin & Orloff',
		description:
			'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
		organizationId: 3,
	},
	{
		name: 'Ladies in Lavender',
		description:
			'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
		organizationId: 6,
	},
	{
		name: 'Gay Deceivers, The',
		description:
			'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
		organizationId: 2,
	},
	{
		name: 'Life as We Know It',
		description:
			'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
		organizationId: 4,
	},
	{
		name: 'Werckmeister Harmonies (Werckmeister harmóniák)',
		description:
			'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
		organizationId: 5,
	},
	{
		name: 'Silver Streak',
		description:
			'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
		organizationId: 7,
	},
	{
		name: 'Commando',
		description:
			'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
		organizationId: 4,
	},
	{
		name: 'Solar Crisis',
		description:
			'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
		organizationId: 10,
	},
	{
		name: 'Last Train Home',
		description:
			'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
		organizationId: 7,
	},
	{
		name: 'Wilderness',
		description:
			'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
		organizationId: 4,
	},
	{
		name: 'Rocket, The',
		description:
			'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
		organizationId: 1,
	},
	{
		name: 'Popular Music (Populärmusik från Vittula)',
		description:
			'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
		organizationId: 3,
	},
	{
		name: 'Diplomatic Immunity (2009– )',
		description:
			'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
		organizationId: 10,
	},
	{
		name: 'Doomsday',
		description:
			'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
		organizationId: 10,
	},
	{
		name: 'Love Is a Many-Splendored Thing',
		description:
			'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
		organizationId: 9,
	},
	{
		name: 'Brief History of Time, A',
		description:
			'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
		organizationId: 5,
	},
	{
		name: 'This Special Friendship (Les amitiés particulières)',
		description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
		organizationId: 9,
	},
	{
		name: 'Norman',
		description: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
		organizationId: 7,
	},
	{
		name: 'Stakeout',
		description:
			'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
		organizationId: 10,
	},
	{
		name: 'Ladies in Lavender',
		description:
			'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
		organizationId: 2,
	},
	{
		name: "Mr. Popper's Penguins",
		description:
			'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
		organizationId: 1,
	},
	{
		name: 'Ajami',
		description:
			'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
		organizationId: 8,
	},
	{
		name: 'About Face: Supermodels Then and Now',
		description:
			'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
		organizationId: 7,
	},
	{
		name: "Angel of Mine (a.k.a. The Mark of an Angel) (L'empreinte de l'ange)",
		description:
			'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
		organizationId: 8,
	},
	{
		name: 'Juche Idea, The',
		description:
			'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
		organizationId: 5,
	},
	{
		name: 'Scarecrows',
		description:
			'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
		organizationId: 9,
	},
	{
		name: 'Plans for Tomorrow (Planes para mañana)',
		description:
			'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
		organizationId: 2,
	},
	{
		name: "Ring Finger, The (L'annulaire)",
		description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
		organizationId: 6,
	},
	{
		name: "Mo' Money",
		description:
			'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
		organizationId: 10,
	},
	{
		name: 'Devils on the Doorstep (Guizi lai le)',
		description:
			'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
		organizationId: 4,
	},
	{
		name: 'Perfect Murder, A',
		description:
			'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
		organizationId: 6,
	},
];

const eventLocations = [
	{ eventId: 1, locationId: 6 },
	{ eventId: 2, locationId: 10 },
	{ eventId: 3, locationId: 7 },
	{ eventId: 4, locationId: 1 },
	{ eventId: 5, locationId: 14 },
	{ eventId: 6, locationId: 18 },
	{ eventId: 7, locationId: 19 },
	{ eventId: 8, locationId: 11 },
	{ eventId: 9, locationId: 3 },
	{ eventId: 10, locationId: 17 },
	{ eventId: 11, locationId: 13 },
	{ eventId: 12, locationId: 14 },
	{ eventId: 13, locationId: 16 },
	{ eventId: 14, locationId: 8 },
	{ eventId: 15, locationId: 4 },
	{ eventId: 16, locationId: 8 },
	{ eventId: 17, locationId: 10 },
	{ eventId: 18, locationId: 4 },
	{ eventId: 19, locationId: 11 },
	{ eventId: 20, locationId: 15 },
	{ eventId: 21, locationId: 6 },
	{ eventId: 22, locationId: 16 },
	{ eventId: 23, locationId: 9 },
	{ eventId: 24, locationId: 4 },
	{ eventId: 25, locationId: 14 },
	{ eventId: 26, locationId: 6 },
	{ eventId: 27, locationId: 13 },
	{ eventId: 28, locationId: 10 },
	{ eventId: 29, locationId: 16 },
	{ eventId: 30, locationId: 10 },
	{ eventId: 31, locationId: 14 },
	{ eventId: 32, locationId: 5 },
	{ eventId: 33, locationId: 15 },
	{ eventId: 34, locationId: 20 },
	{ eventId: 35, locationId: 8 },
	{ eventId: 36, locationId: 13 },
	{ eventId: 37, locationId: 1 },
	{ eventId: 38, locationId: 2 },
	{ eventId: 39, locationId: 8 },
	{ eventId: 40, locationId: 13 },
	{ eventId: 41, locationId: 18 },
	{ eventId: 42, locationId: 17 },
	{ eventId: 43, locationId: 16 },
	{ eventId: 44, locationId: 20 },
	{ eventId: 45, locationId: 4 },
	{ eventId: 46, locationId: 16 },
	{ eventId: 47, locationId: 15 },
	{ eventId: 48, locationId: 12 },
	{ eventId: 49, locationId: 11 },
	{ eventId: 50, locationId: 9 },
	{ eventId: 51, locationId: 18 },
	{ eventId: 52, locationId: 2 },
	{ eventId: 53, locationId: 11 },
	{ eventId: 54, locationId: 18 },
	{ eventId: 55, locationId: 8 },
	{ eventId: 56, locationId: 10 },
	{ eventId: 57, locationId: 13 },
	{ eventId: 58, locationId: 2 },
	{ eventId: 59, locationId: 1 },
	{ eventId: 60, locationId: 17 },
	{ eventId: 61, locationId: 4 },
	{ eventId: 62, locationId: 19 },
	{ eventId: 63, locationId: 9 },
	{ eventId: 64, locationId: 8 },
	{ eventId: 65, locationId: 18 },
	{ eventId: 66, locationId: 7 },
	{ eventId: 67, locationId: 4 },
	{ eventId: 68, locationId: 6 },
	{ eventId: 69, locationId: 7 },
	{ eventId: 70, locationId: 13 },
	{ eventId: 71, locationId: 7 },
	{ eventId: 72, locationId: 14 },
	{ eventId: 73, locationId: 4 },
	{ eventId: 74, locationId: 15 },
	{ eventId: 75, locationId: 13 },
	{ eventId: 76, locationId: 8 },
	{ eventId: 77, locationId: 1 },
	{ eventId: 78, locationId: 17 },
	{ eventId: 79, locationId: 19 },
	{ eventId: 80, locationId: 20 },
	{ eventId: 81, locationId: 15 },
	{ eventId: 82, locationId: 9 },
	{ eventId: 83, locationId: 18 },
	{ eventId: 84, locationId: 12 },
	{ eventId: 85, locationId: 18 },
	{ eventId: 86, locationId: 14 },
	{ eventId: 87, locationId: 9 },
	{ eventId: 88, locationId: 1 },
	{ eventId: 89, locationId: 14 },
	{ eventId: 90, locationId: 7 },
	{ eventId: 91, locationId: 3 },
	{ eventId: 92, locationId: 20 },
	{ eventId: 93, locationId: 13 },
	{ eventId: 94, locationId: 19 },
	{ eventId: 95, locationId: 3 },
	{ eventId: 96, locationId: 5 },
	{ eventId: 97, locationId: 15 },
	{ eventId: 98, locationId: 3 },
	{ eventId: 99, locationId: 16 },
	{ eventId: 100, locationId: 3 },
	{ eventId: 95, locationId: 9 },
	{ eventId: 73, locationId: 3 },
	{ eventId: 8, locationId: 19 },
	{ eventId: 37, locationId: 19 },
	{ eventId: 98, locationId: 6 },
	{ eventId: 35, locationId: 15 },
	{ eventId: 37, locationId: 15 },
	{ eventId: 89, locationId: 18 },
	{ eventId: 14, locationId: 2 },
	{ eventId: 45, locationId: 5 },
	{ eventId: 58, locationId: 6 },
	{ eventId: 50, locationId: 4 },
	{ eventId: 75, locationId: 20 },
	{ eventId: 44, locationId: 19 },
	{ eventId: 76, locationId: 2 },
	{ eventId: 22, locationId: 5 },
	{ eventId: 14, locationId: 1 },
	{ eventId: 4, locationId: 17 },
	{ eventId: 8, locationId: 10 },
	{ eventId: 74, locationId: 5 },
];

const dates = [
	{ date: '2022-10-16', price: 1957, eventLocationId: 1, total_tickets: 500 },
	{ date: '2022-09-06', price: 752, eventLocationId: 2, total_tickets: 500 },
	{ date: '2022-10-03', price: 1491, eventLocationId: 3, total_tickets: 500 },
	{ date: '2022-06-30', price: 708, eventLocationId: 4, total_tickets: 500 },
	{ date: '2022-07-25', price: 1619, eventLocationId: 5, total_tickets: 500 },
	{ date: '2022-09-15', price: 1428, eventLocationId: 6, total_tickets: 500 },
	{ date: '2022-09-12', price: 1048, eventLocationId: 7, total_tickets: 500 },
	{ date: '2022-07-19', price: 1328, eventLocationId: 8, total_tickets: 500 },
	{ date: '2022-07-24', price: 1551, eventLocationId: 9, total_tickets: 500 },
	{ date: '2022-07-04', price: 549, eventLocationId: 10, total_tickets: 500 },
	{ date: '2022-06-31', price: 1553, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-08-08', price: 962, eventLocationId: 12, total_tickets: 500 },
	{ date: '2022-07-07', price: 1028, eventLocationId: 13, total_tickets: 500 },
	{ date: '2022-07-11', price: 1778, eventLocationId: 14, total_tickets: 500 },
	{ date: '2022-08-21', price: 592, eventLocationId: 15, total_tickets: 500 },
	{ date: '2022-09-20', price: 1296, eventLocationId: 16, total_tickets: 500 },
	{ date: '2022-07-20', price: 1876, eventLocationId: 17, total_tickets: 500 },
	{ date: '2022-09-28', price: 1631, eventLocationId: 18, total_tickets: 500 },
	{ date: '2022-08-16', price: 1397, eventLocationId: 19, total_tickets: 500 },
	{ date: '2022-07-06', price: 1212, eventLocationId: 20, total_tickets: 500 },
	{ date: '2022-07-11', price: 1311, eventLocationId: 21, total_tickets: 500 },
	{ date: '2022-07-19', price: 1636, eventLocationId: 22, total_tickets: 500 },
	{ date: '2022-08-22', price: 907, eventLocationId: 23, total_tickets: 500 },
	{ date: '2022-07-27', price: 1758, eventLocationId: 24, total_tickets: 500 },
	{ date: '2022-10-28', price: 644, eventLocationId: 25, total_tickets: 500 },
	{ date: '2022-09-24', price: 1101, eventLocationId: 26, total_tickets: 500 },
	{ date: '2022-010-21', price: 1923, eventLocationId: 27, total_tickets: 500 },
	{ date: '2022-09-11', price: 983, eventLocationId: 28, total_tickets: 500 },
	{ date: '2022-10-16', price: 653, eventLocationId: 29, total_tickets: 500 },
	{ date: '2022-09-05', price: 1191, eventLocationId: 30, total_tickets: 500 },
	{ date: '2022-07-12', price: 634, eventLocationId: 31, total_tickets: 500 },
	{ date: '2022-12-01', price: 663, eventLocationId: 32, total_tickets: 500 },
	{ date: '2022-12-25', price: 950, eventLocationId: 33, total_tickets: 500 },
	{ date: '2022-07-02', price: 1958, eventLocationId: 34, total_tickets: 500 },
	{ date: '2022-11-30', price: 1763, eventLocationId: 35, total_tickets: 500 },
	{ date: '2022-11-15', price: 1643, eventLocationId: 36, total_tickets: 500 },
	{ date: '2022-09-24', price: 1764, eventLocationId: 37, total_tickets: 500 },
	{ date: '2022-11-23', price: 761, eventLocationId: 38, total_tickets: 500 },
	{ date: '2022-08-26', price: 1522, eventLocationId: 39, total_tickets: 500 },
	{ date: '2022-12-13', price: 1557, eventLocationId: 40, total_tickets: 500 },
	{ date: '2022-08-19', price: 1992, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-09-12', price: 1305, eventLocationId: 42, total_tickets: 500 },
	{ date: '2022-09-10', price: 1274, eventLocationId: 43, total_tickets: 500 },
	{ date: '2022-09-10', price: 1031, eventLocationId: 44, total_tickets: 500 },
	{ date: '2022-07-08', price: 515, eventLocationId: 45, total_tickets: 500 },
	{ date: '2022-12-10', price: 510, eventLocationId: 46, total_tickets: 500 },
	{ date: '2022-06-11', price: 1499, eventLocationId: 47, total_tickets: 500 },
	{ date: '2022-08-13', price: 1465, eventLocationId: 48, total_tickets: 500 },
	{ date: '2022-10-17', price: 1310, eventLocationId: 49, total_tickets: 500 },
	{ date: '2022-09-06', price: 545, eventLocationId: 50, total_tickets: 500 },
	{ date: '2022-09-29', price: 1010, eventLocationId: 51, total_tickets: 500 },
	{ date: '2022-07-26', price: 1440, eventLocationId: 52, total_tickets: 500 },
	{ date: '2022-11-23', price: 737, eventLocationId: 53, total_tickets: 500 },
	{ date: '2022-10-17', price: 974, eventLocationId: 54, total_tickets: 500 },
	{ date: '2022-07-25', price: 1759, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-11-01', price: 1502, eventLocationId: 56, total_tickets: 500 },
	{ date: '2022-11-02', price: 1942, eventLocationId: 57, total_tickets: 500 },
	{ date: '2022-11-01', price: 932, eventLocationId: 58, total_tickets: 500 },
	{ date: '2022-09-12', price: 997, eventLocationId: 59, total_tickets: 500 },
	{ date: '2022-09-18', price: 1191, eventLocationId: 60, total_tickets: 500 },
	{ date: '2022-08-11', price: 1785, eventLocationId: 61, total_tickets: 500 },
	{ date: '2022-07-19', price: 1850, eventLocationId: 62, total_tickets: 500 },
	{ date: '2022-07-15', price: 664, eventLocationId: 63, total_tickets: 500 },
	{ date: '2022-07-22', price: 728, eventLocationId: 64, total_tickets: 500 },
	{ date: '2022-07-04', price: 1452, eventLocationId: 65, total_tickets: 500 },
	{ date: '2022-08-19', price: 528, eventLocationId: 66, total_tickets: 500 },
	{ date: '2022-07-30', price: 508, eventLocationId: 67, total_tickets: 500 },
	{ date: '2022-07-23', price: 1017, eventLocationId: 68, total_tickets: 500 },
	{ date: '2022-07-04', price: 1598, eventLocationId: 69, total_tickets: 500 },
	{ date: '2022-10-02', price: 1852, eventLocationId: 70, total_tickets: 500 },
	{ date: '2022-08-30', price: 1300, eventLocationId: 71, total_tickets: 500 },
	{ date: '2022-08-01', price: 958, eventLocationId: 72, total_tickets: 500 },
	{ date: '2022-09-06', price: 1883, eventLocationId: 73, total_tickets: 500 },
	{ date: '2022-10-11', price: 1097, eventLocationId: 74, total_tickets: 500 },
	{ date: '2022-11-20', price: 709, eventLocationId: 75, total_tickets: 500 },
	{ date: '2022-11-03', price: 1271, eventLocationId: 76, total_tickets: 500 },
	{ date: '2022-07-06', price: 1587, eventLocationId: 77, total_tickets: 500 },
	{ date: '2022-07-07', price: 990, eventLocationId: 78, total_tickets: 500 },
	{ date: '2022-10-06', price: 1590, eventLocationId: 79, total_tickets: 500 },
	{ date: '2022-08-05', price: 1686, eventLocationId: 80, total_tickets: 500 },
	{ date: '2022-08-16', price: 784, eventLocationId: 81, total_tickets: 500 },
	{ date: '2022-08-28', price: 1070, eventLocationId: 82, total_tickets: 500 },
	{ date: '2022-08-22', price: 963, eventLocationId: 83, total_tickets: 500 },
	{ date: '2022-07-05', price: 1056, eventLocationId: 84, total_tickets: 500 },
	{ date: '2022-08-24', price: 1054, eventLocationId: 85, total_tickets: 500 },
	{ date: '2022-09-01', price: 747, eventLocationId: 86, total_tickets: 500 },
	{ date: '2022-08-17', price: 580, eventLocationId: 87, total_tickets: 500 },
	{ date: '2022-09-29', price: 1620, eventLocationId: 88, total_tickets: 500 },
	{ date: '2022-09-11', price: 1521, eventLocationId: 89, total_tickets: 500 },
	{ date: '2022-07-12', price: 1001, eventLocationId: 90, total_tickets: 500 },
	{ date: '2022-09-31', price: 1429, eventLocationId: 91, total_tickets: 500 },
	{ date: '2022-12-24', price: 728, eventLocationId: 92, total_tickets: 500 },
	{ date: '2022-01-21', price: 1729, eventLocationId: 93, total_tickets: 500 },
	{ date: '2022-07-14', price: 1467, eventLocationId: 94, total_tickets: 500 },
	{ date: '2022-07-08', price: 1761, eventLocationId: 95, total_tickets: 500 },
	{ date: '2022-11-11', price: 1114, eventLocationId: 96, total_tickets: 500 },
	{ date: '2022-09-16', price: 1051, eventLocationId: 97, total_tickets: 500 },
	{ date: '2022-06-27', price: 748, eventLocationId: 98, total_tickets: 500 },
	{ date: '2022-07-17', price: 1900, eventLocationId: 99, total_tickets: 500 },
	{ date: '2022-07-22', price: 1913, eventLocationId: 100, total_tickets: 500 },
	{ date: '2022-10-23', price: 1005, eventLocationId: 45, total_tickets: 500 },
	{ date: '2022-09-12', price: 1090, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-08-27', price: 1102, eventLocationId: 28, total_tickets: 500 },
	{ date: '2022-07-08', price: 1413, eventLocationId: 76, total_tickets: 500 },
	{ date: '2022-12-28', price: 1068, eventLocationId: 76, total_tickets: 500 },
	{ date: '2022-08-12', price: 1515, eventLocationId: 66, total_tickets: 500 },
	{ date: '2022-10-13', price: 582, eventLocationId: 23, total_tickets: 500 },
	{ date: '2022-07-29', price: 584, eventLocationId: 33, total_tickets: 500 },
	{ date: '2022-08-23', price: 1750, eventLocationId: 87, total_tickets: 500 },
	{ date: '2022-10-14', price: 1515, eventLocationId: 100, total_tickets: 500 },
	{ date: '2022-07-10', price: 1696, eventLocationId: 63, total_tickets: 500 },
	{ date: '2022-08-06', price: 786, eventLocationId: 34, total_tickets: 500 },
	{ date: '2022-10-19', price: 1478, eventLocationId: 50, total_tickets: 500 },
	{ date: '2022-03-13', price: 759, eventLocationId: 76, total_tickets: 500 },
	{ date: '2022-08-01', price: 743, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-10-16', price: 736, eventLocationId: 74, total_tickets: 500 },
	{ date: '2022-08-26', price: 1790, eventLocationId: 63, total_tickets: 500 },
	{ date: '2022-07-24', price: 1381, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-08-08', price: 1434, eventLocationId: 49, total_tickets: 500 },
	{ date: '2022-08-30', price: 635, eventLocationId: 25, total_tickets: 500 },
	{ date: '2022-12-06', price: 967, eventLocationId: 63, total_tickets: 500 },
	{ date: '2022-11-19', price: 1217, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-09-01', price: 1053, eventLocationId: 29, total_tickets: 500 },
	{ date: '2022-07-27', price: 1891, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-11-10', price: 618, eventLocationId: 19, total_tickets: 500 },
	{ date: '2022-10-31', price: 1014, eventLocationId: 14, total_tickets: 500 },
	{ date: '2022-08-17', price: 1193, eventLocationId: 46, total_tickets: 500 },
	{ date: '2022-09-27', price: 1040, eventLocationId: 100, total_tickets: 500 },
	{ date: '2022-08-19', price: 878, eventLocationId: 35, total_tickets: 500 },
	{ date: '2022-07-26', price: 1114, eventLocationId: 39, total_tickets: 500 },
	{ date: '2022-11-05', price: 698, eventLocationId: 40, total_tickets: 500 },
	{ date: '2022-08-22', price: 910, eventLocationId: 91, total_tickets: 500 },
	{ date: '2022-10-08', price: 1313, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-10-12', price: 1369, eventLocationId: 6, total_tickets: 500 },
	{ date: '2022-12-10', price: 1393, eventLocationId: 83, total_tickets: 500 },
	{ date: '2022-09-25', price: 777, eventLocationId: 24, total_tickets: 500 },
	{ date: '2022-12-28', price: 690, eventLocationId: 84, total_tickets: 500 },
	{ date: '2022-12-08', price: 1525, eventLocationId: 82, total_tickets: 500 },
	{ date: '2022-12-01', price: 578, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-07-16', price: 1714, eventLocationId: 24, total_tickets: 500 },
	{ date: '2022-09-21', price: 1978, eventLocationId: 13, total_tickets: 500 },
	{ date: '2022-10-02', price: 803, eventLocationId: 10, total_tickets: 500 },
	{ date: '2022-10-21', price: 1910, eventLocationId: 28, total_tickets: 500 },
	{ date: '2022-12-07', price: 594, eventLocationId: 27, total_tickets: 500 },
	{ date: '2022-12-26', price: 1497, eventLocationId: 75, total_tickets: 500 },
	{ date: '2022-12-23', price: 935, eventLocationId: 40, total_tickets: 500 },
	{ date: '2022-08-01', price: 1608, eventLocationId: 22, total_tickets: 500 },
	{ date: '2022-07-09', price: 1264, eventLocationId: 82, total_tickets: 500 },
	{ date: '2022-08-10', price: 927, eventLocationId: 88, total_tickets: 500 },
	{ date: '2022-08-06', price: 1125, eventLocationId: 24, total_tickets: 500 },
	{ date: '2022-02-03', price: 721, eventLocationId: 57, total_tickets: 500 },
	{ date: '2022-10-29', price: 1407, eventLocationId: 39, total_tickets: 500 },
	{ date: '2022-07-26', price: 1404, eventLocationId: 25, total_tickets: 500 },
	{ date: '2022-12-01', price: 1313, eventLocationId: 92, total_tickets: 500 },
	{ date: '2022-12-21', price: 1288, eventLocationId: 46, total_tickets: 500 },
	{ date: '2022-09-07', price: 562, eventLocationId: 20, total_tickets: 500 },
	{ date: '2022-09-07', price: 841, eventLocationId: 38, total_tickets: 500 },
	{ date: '2022-09-14', price: 1851, eventLocationId: 62, total_tickets: 500 },
	{ date: '2022-10-07', price: 1913, eventLocationId: 59, total_tickets: 500 },
	{ date: '2022-10-22', price: 504, eventLocationId: 34, total_tickets: 500 },
	{ date: '2022-10-16', price: 1311, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-10-04', price: 1961, eventLocationId: 56, total_tickets: 500 },
	{ date: '2022-10-08', price: 1095, eventLocationId: 48, total_tickets: 500 },
	{ date: '2022-08-10', price: 1461, eventLocationId: 78, total_tickets: 500 },
	{ date: '2022-08-03', price: 1136, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-12-12', price: 581, eventLocationId: 67, total_tickets: 500 },
	{ date: '2022-12-02', price: 1417, eventLocationId: 68, total_tickets: 500 },
	{ date: '2022-08-09', price: 593, eventLocationId: 79, total_tickets: 500 },
	{ date: '2022-08-12', price: 1321, eventLocationId: 1, total_tickets: 500 },
	{ date: '2022-09-28', price: 1390, eventLocationId: 4, total_tickets: 500 },
	{ date: '2022-09-14', price: 1228, eventLocationId: 14, total_tickets: 500 },
	{ date: '2022-12-18', price: 1430, eventLocationId: 99, total_tickets: 500 },
	{ date: '2022-07-13', price: 946, eventLocationId: 31, total_tickets: 500 },
	{ date: '2022-08-21', price: 723, eventLocationId: 39, total_tickets: 500 },
	{ date: '2022-11-25', price: 514, eventLocationId: 10, total_tickets: 500 },
	{ date: '2022-09-08', price: 969, eventLocationId: 10, total_tickets: 500 },
	{ date: '2022-12-27', price: 1222, eventLocationId: 98, total_tickets: 500 },
	{ date: '2022-11-11', price: 1647, eventLocationId: 95, total_tickets: 500 },
	{ date: '2022-11-08', price: 1000, eventLocationId: 47, total_tickets: 500 },
	{ date: '2022-07-18', price: 1579, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-06-30', price: 941, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-08-23', price: 1861, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-08-07', price: 1469, eventLocationId: 93, total_tickets: 500 },
	{ date: '2022-09-11', price: 871, eventLocationId: 1, total_tickets: 500 },
	{ date: '2022-10-17', price: 1598, eventLocationId: 21, total_tickets: 500 },
	{ date: '2022-12-14', price: 1600, eventLocationId: 59, total_tickets: 500 },
	{ date: '2022-08-26', price: 511, eventLocationId: 87, total_tickets: 500 },
	{ date: '2022-12-05', price: 1931, eventLocationId: 100, total_tickets: 500 },
	{ date: '2022-12-08', price: 1064, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-12-28', price: 1854, eventLocationId: 17, total_tickets: 500 },
	{ date: '2022-07-29', price: 868, eventLocationId: 54, total_tickets: 500 },
	{ date: '2022-12-26', price: 1064, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-09-14', price: 862, eventLocationId: 93, total_tickets: 500 },
	{ date: '2022-11-28', price: 753, eventLocationId: 97, total_tickets: 500 },
	{ date: '2022-12-17', price: 1712, eventLocationId: 53, total_tickets: 500 },
	{ date: '2022-11-07', price: 982, eventLocationId: 85, total_tickets: 500 },
	{ date: '2022-11-01', price: 1089, eventLocationId: 13, total_tickets: 500 },
	{ date: '2022-12-28', price: 1830, eventLocationId: 91, total_tickets: 500 },
	{ date: '2022-09-27', price: 693, eventLocationId: 61, total_tickets: 500 },
	{ date: '2022-08-10', price: 578, eventLocationId: 26, total_tickets: 500 },
];

const categories = [
	{ name: 'Infantil' },
	{ name: 'Deportes' },
	{ name: 'Musical' },
	{ name: 'Teatro' },
	{ name: 'Especiales' },
];

const cities = [
	{ name: 'San Juan' },
	{ name: 'Mendoza' },
	{ name: 'Córdoba' },
	{ name: 'Formosa' },
	{ name: 'La Pampa' },
	{ name: 'Buenos Aires' },
	{ name: 'La Rioja' },
	{ name: 'Jujuy' },
	{ name: 'Santiago del Estero' },
	{ name: 'Tierra del Fuego' },
	{ name: 'Chubut' },
	{ name: 'Santa Cruz' },
	{ name: 'San Luis' },
	{ name: 'Misiones' },
	{ name: 'Corrientes' },
	{ name: 'Tucumán' },
	{ name: 'Ciudad Autónoma de Buenos Aires' },
	{ name: 'Catamarca' },
	{ name: 'Chaco' },
	{ name: 'Entre Ríos' },
	{ name: 'Neuquén' },
	{ name: 'Río Negro' },
	{ name: 'Salta' },
	{ name: 'Santa Fe' }
];

const images = [
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/disney-inv-960.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/fb_960x400_12.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/cami_poster_960x400_sin_tktk.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ticketek-gran-gala_960x400.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/andrea_vieru_960x400.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/polenta_960x400.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/estgen960.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/topa-960x400-portado-web-quality-y-ticketek.png",
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/tickete01.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ke-personajes.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/ismael.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_sin_logo.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_17.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/mesa_de_trabajo_2.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pieza-banana-ticketek-960-x-400-px.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/jc960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/2_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/sele960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/kev960_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/volar960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/imaguare-960x400.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pat89960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/lauren960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ciro960_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ciro960_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400german.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/cordo960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960_5.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pieza-ticketek-960-x-400-px.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/mau960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/maxi960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/piano-gen960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/960x4001.jpg',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/masters960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/masters960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/960x400_mbpr.jpg',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/noventosa_verano_reprogramado.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/biza960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/dust960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/rid960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/miran960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pieza-ticketek-960-x-400-px1.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/luc960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pier960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/park960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/angela_960x400.jpg',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400-copia_1.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400mana_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400mana_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/cafcor960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/dsjgen960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_65.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/sugo960_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/artist/cata440.jpg',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/radagen960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/cuart960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/wall960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/dalma960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ort960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400-copia_1.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400mana_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400et.png',
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/marisa_monte_-_960_x_400_0.jpg",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_27.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x4008.jpg",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ero960.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/bada-960x400.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400-vangogh_0.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_27.png",
];

const users = [
	{
		name: 'Melessa',
		surname: 'Dayborne',
		email: 'mdayborne0@ycombinator.com',
		password: 'GQEKOU',
	},
	{
		name: 'Alvan',
		surname: 'Van Driel',
		email: 'avandriel1@dedecms.com',
		password: 'Zw25NF8',
	},
	{
		name: 'Bradford',
		surname: 'Wressell',
		email: 'bwressell2@discuz.net',
		password: 'w1SpGeoM',
	},
	{
		name: 'Alessandro',
		surname: 'Ide',
		email: 'aide3@irs.gov',
		password: 'koYA1JM9kJ',
	},
	{
		name: 'Penny',
		surname: 'Chalfain',
		email: 'pchalfain4@usatoday.com',
		password: '0vmKNsU7eZMt',
	},
	{
		name: 'Smitty',
		surname: 'Szapiro',
		email: 'sszapiro5@nps.gov',
		password: 'McAwk5dM',
	},
	{
		name: 'Bonnee',
		surname: 'Powles',
		email: 'bpowles6@mit.edu',
		password: 'RjNN0u4uU',
	},
	{
		name: 'Chelsae',
		surname: 'Vanelli',
		email: 'cvanelli7@senate.gov',
		password: '3QDiOVGjujd',
	},
	{
		name: 'Alanna',
		surname: 'Dare',
		email: 'adare8@home.pl',
		password: '8wbkyhN5LT',
	},
	{
		name: 'Percival',
		surname: 'Wilkins',
		email: 'pwilkins9@gravatar.com',
		password: 'WUcnAgpJ',
	},
	{
		name: 'Dorita',
		surname: 'Battle',
		email: 'dbattlea@statcounter.com',
		password: 'MHvMjJz4',
	},
	{
		name: 'Sharyl',
		surname: 'Connelly',
		email: 'sconnellyb@csmonitor.com',
		password: 'Ub8dXaaK',
	},
	{
		name: 'Leif',
		surname: 'Lere',
		email: 'llerec@blogger.com',
		password: '40ueS9GgS1Ae',
	},
	{
		name: 'Shalom',
		surname: 'Fairley',
		email: 'sfairleyd@intel.com',
		password: 'LuxVahs',
	},
	{
		name: 'Sid',
		surname: 'Keogh',
		email: 'skeoghe@mayoclinic.com',
		password: '7EoteZ2bSV',
	},
	{
		name: 'Hiram',
		surname: 'Darwent',
		email: 'hdarwentf@smh.com.au',
		password: 'cCXskozAaEX',
	},
	{
		name: 'Leona',
		surname: 'Dulwich',
		email: 'ldulwichg@about.com',
		password: '2NwgueE13u',
	},
	{
		name: 'Marco',
		surname: 'Scandrick',
		email: 'mscandrickh@mac.com',
		password: 'iOKl2if',
	},
	{
		name: 'Valentijn',
		surname: 'Petrik',
		email: 'vpetriki@springer.com',
		password: '2Vcb69Hkwum',
	},
	{
		name: 'Michaeline',
		surname: 'Cawse',
		email: 'mcawsej@google.com',
		password: 'DozfjQSwXLJU',
	},
	{
		name: 'Mikaela',
		surname: 'Barczynski',
		email: 'mbarczynskik@squarespace.com',
		password: 'Cdcg9nOpxua',
	},
	{
		name: 'Ingmar',
		surname: 'Raun',
		email: 'iraunl@mysql.com',
		password: 'ArD0NLaq',
	},
	{
		name: 'Malanie',
		surname: 'Arran',
		email: 'marranm@tripod.com',
		password: 'aL5qvmfLo',
	},
	{
		name: 'Andreas',
		surname: 'Olyfant',
		email: 'aolyfantn@xing.com',
		password: '0nB60U',
	},
	{
		name: 'Lionello',
		surname: 'Lawford',
		email: 'llawfordo@adobe.com',
		password: 'ByI46CZvl9',
	},
	{
		name: 'George',
		surname: 'Bramhall',
		email: 'gbramhallp@exblog.jp',
		password: 'eviBulYSyN',
	},
	{
		name: 'Gordie',
		surname: 'Kingswood',
		email: 'gkingswoodq@fastcompany.com',
		password: 'bApbcqpyA0',
	},
	{
		name: 'Nelia',
		surname: 'Harrington',
		email: 'nharringtonr@wordpress.org',
		password: 'IVuFxAK',
	},
	{
		name: 'Efren',
		surname: 'Hymer',
		email: 'ehymers@sun.com',
		password: 'b2bpMoG0OhVU',
	},
	{
		name: 'Nolana',
		surname: 'Archbould',
		email: 'narchbouldt@bandcamp.com',
		password: 'Wd9oYB9egg4f',
	},
	{
		name: 'Morly',
		surname: 'Vaudre',
		email: 'mvaudreu@google.co.uk',
		password: 'tmtxAGk',
	},
	{
		name: 'Patten',
		surname: 'Owlner',
		email: 'powlnerv@netvibes.com',
		password: 'mk25bXwRe',
	},
	{
		name: 'Caryl',
		surname: 'Coite',
		email: 'ccoitew@xrea.com',
		password: 'S4hZ5OyQ04i',
	},
	{
		name: 'Moses',
		surname: 'Batchelder',
		email: 'mbatchelderx@ucsd.edu',
		password: '6XGAsSDmJJ',
	},
	{
		name: 'Marie-jeanne',
		surname: 'Ashdown',
		email: 'mashdowny@technorati.com',
		password: '304DvW',
	},
	{
		name: 'Wandie',
		surname: 'Highway',
		email: 'whighwayz@chronoengine.com',
		password: 'mwTEjznWw',
	},
	{
		name: 'Lavinie',
		surname: 'McAree',
		email: 'lmcaree10@arizona.edu',
		password: 'I08IwLh8e',
	},
	{
		name: 'Theresa',
		surname: 'Muino',
		email: 'tmuino11@tmall.com',
		password: 'DtNE2q',
	},
	{
		name: 'Belia',
		surname: 'Marvel',
		email: 'bmarvel12@is.gd',
		password: 'twZkjtT',
	},
	{
		name: 'Marybeth',
		surname: 'Baguley',
		email: 'mbaguley13@oakley.com',
		password: 'WNHuEM7FF0n',
	},
	{
		name: 'Chicky',
		surname: 'Gieves',
		email: 'cgieves14@sohu.com',
		password: 'zZpUzK9tOU6x',
	},
	{
		name: 'Daryle',
		surname: 'Spaduzza',
		email: 'dspaduzza15@facebook.com',
		password: '0hUYcT',
	},
	{
		name: 'Stephannie',
		surname: 'Tolliday',
		email: 'stolliday16@epa.gov',
		password: 'cOp9iqWxA4',
	},
	{
		name: 'Malchy',
		surname: 'Sultana',
		email: 'msultana17@hibu.com',
		password: 'uuQSny',
	},
	{
		name: 'Corbin',
		surname: 'Sloey',
		email: 'csloey18@ed.gov',
		password: 'E75y8VCE',
	},
	{
		name: 'Chuck',
		surname: 'Dingate',
		email: 'cdingate19@yellowbook.com',
		password: 'KVySosfUCcz9',
	},
	{
		name: 'Denys',
		surname: 'Binfield',
		email: 'dbinfield1a@themeforest.net',
		password: 'XiixtrHRT',
	},
	{
		name: 'Lavinie',
		surname: 'Woodyear',
		email: 'lwoodyear1b@rediff.com',
		password: '5nS9fMNsqz',
	},
	{
		name: 'Federico',
		surname: 'Olin',
		email: 'folin1c@cargocollective.com',
		password: 'kZAaMQUY',
	},
	{
		name: 'Inna',
		surname: 'Kiddell',
		email: 'ikiddell1d@house.gov',
		password: 'aSbAi2wdBN',
	},
	{
		name: 'Hurlee',
		surname: 'McGeaney',
		email: 'hmcgeaney1e@google.com.au',
		password: 'gNdkNWxLB',
	},
	{
		name: 'Verile',
		surname: 'Aplin',
		email: 'vaplin1f@apple.com',
		password: 'WVHZM8J06ciG',
	},
	{
		name: 'Morissa',
		surname: 'Benduhn',
		email: 'mbenduhn1g@nymag.com',
		password: 'EuGf6i',
	},
	{
		name: 'Angelica',
		surname: 'Timpany',
		email: 'atimpany1h@ning.com',
		password: 'nIhFuie5pc5d',
	},
	{
		name: 'Kessiah',
		surname: 'Traves',
		email: 'ktraves1i@joomla.org',
		password: 'ABvVX0SGUum',
	},
	{
		name: 'James',
		surname: 'Wearn',
		email: 'jwearn1j@google.cn',
		password: 'rhgXNl9Hx',
	},
	{
		name: 'Ham',
		surname: 'Bentke',
		email: 'hbentke1k@examiner.com',
		password: '4dMuexN6L4',
	},
	{
		name: 'Kirsti',
		surname: 'Pittel',
		email: 'kpittel1l@desdev.cn',
		password: 'FKNUJFvfvb',
	},
	{
		name: 'Addison',
		surname: 'Franey',
		email: 'afraney1m@scribd.com',
		password: '3OOxOOQm',
	},
	{
		name: 'Alanson',
		surname: 'Hukin',
		email: 'ahukin1n@sogou.com',
		password: 'JJEyOc',
	},
	{
		name: 'Jermaine',
		surname: 'Ochterlonie',
		email: 'jochterlonie1o@51.la',
		password: 'zha44bBe',
	},
	{
		name: 'Frederique',
		surname: 'Noore',
		email: 'fnoore1p@printfriendly.com',
		password: 'HdvfpTUD',
	},
	{
		name: 'Colman',
		surname: 'Harly',
		email: 'charly1q@vinaora.com',
		password: '962AKslob',
	},
	{
		name: 'Nerita',
		surname: 'Vinecombe',
		email: 'nvinecombe1r@godaddy.com',
		password: 'RDuNWH4EYW',
	},
	{
		name: 'Dori',
		surname: 'Izzatt',
		email: 'dizzatt1s@nationalgeographic.com',
		password: 'VQBQxnOq',
	},
	{
		name: 'Nanine',
		surname: 'Guidotti',
		email: 'nguidotti1t@ucla.edu',
		password: 'Gvf5bJuH5tL',
	},
	{
		name: 'Sebastien',
		surname: 'Tacker',
		email: 'stacker1u@fema.gov',
		password: 'GaevaNzSz7x',
	},
	{
		name: 'Felicio',
		surname: 'Fairpo',
		email: 'ffairpo1v@noaa.gov',
		password: '3PNNfN5qbd',
	},
	{
		name: 'Harp',
		surname: 'Antonovic',
		email: 'hantonovic1w@soundcloud.com',
		password: 'O44KBsy5W',
	},
	{
		name: 'Grange',
		surname: 'Showering',
		email: 'gshowering1x@biblegateway.com',
		password: 'feY5XE5',
	},
	{
		name: 'Diannne',
		surname: 'Hourihan',
		email: 'dhourihan1y@umn.edu',
		password: 'E2nD7N',
	},
	{
		name: 'Egbert',
		surname: 'Arnall',
		email: 'earnall1z@facebook.com',
		password: 'ZDpQkV9t7',
	},
	{
		name: 'Agneta',
		surname: 'McCaskill',
		email: 'amccaskill20@tinyurl.com',
		password: 'XK6FVAql',
	},
	{
		name: 'Kendre',
		surname: 'Safont',
		email: 'ksafont21@indiatimes.com',
		password: 'UKJtxO',
	},
	{
		name: 'Yvor',
		surname: 'Pottell',
		email: 'ypottell22@bravesites.com',
		password: 'axVe0Puw1Eb',
	},
	{
		name: 'Gale',
		surname: 'Baldini',
		email: 'gbaldini23@theglobeandmail.com',
		password: '39kRwoE0',
	},
	{
		name: 'Dennis',
		surname: 'Riply',
		email: 'driply24@google.com.br',
		password: 'fEMivGN3',
	},
	{
		name: 'Janessa',
		surname: 'Cornford',
		email: 'jcornford25@i2i.jp',
		password: 'HztDV5uj2Y',
	},
	{
		name: 'Griz',
		surname: 'St. Aubyn',
		email: 'gstaubyn26@liveinternet.ru',
		password: 'OmlrygCWuM',
	},
	{
		name: 'Anton',
		surname: 'Darling',
		email: 'adarling27@tripadvisor.com',
		password: 'bC6qxgrv',
	},
	{
		name: 'Mil',
		surname: 'Kingdon',
		email: 'mkingdon28@a8.net',
		password: 'YHi6Hdk',
	},
	{
		name: 'Raimundo',
		surname: 'Warret',
		email: 'rwarret29@loc.gov',
		password: 'DXbIBh',
	},
	{
		name: 'Agustin',
		surname: 'Taw',
		email: 'ataw2a@ox.ac.uk',
		password: '9nqNRu',
	},
	{
		name: 'Charlie',
		surname: 'Hadingham',
		email: 'chadingham2b@instagram.com',
		password: 'hDepNEpZi8x',
	},
	{
		name: 'Fancy',
		surname: 'Philott',
		email: 'fphilott2c@slate.com',
		password: 'AG7ipsc8RL',
	},
	{
		name: 'Shaun',
		surname: 'Asals',
		email: 'sasals2d@smugmug.com',
		password: 'orgMTLeZy',
	},
	{
		name: 'Myra',
		surname: 'Kornacki',
		email: 'mkornacki2e@geocities.com',
		password: 'KbrB5HcK',
	},
	{
		name: 'Andria',
		surname: 'Althrop',
		email: 'aalthrop2f@ucoz.ru',
		password: 'UGajw8VKT',
	},
	{
		name: 'Alberto',
		surname: 'MacDonald',
		email: 'amacdonald2g@hostgator.com',
		password: 'Zi44QIb',
	},
	{
		name: 'Billye',
		surname: 'Cockings',
		email: 'bcockings2h@engadget.com',
		password: 'Vp98m2sf38',
	},
	{
		name: 'Goldi',
		surname: 'Venner',
		email: 'gvenner2i@deliciousdays.com',
		password: 'ocSNmXpazo',
	},
	{
		name: 'Jolyn',
		surname: 'Hair',
		email: 'jhair2j@plala.or.jp',
		password: 'IxWERyY3U',
	},
	{
		name: 'Kanya',
		surname: 'Ketton',
		email: 'kketton2k@multiply.com',
		password: 'AcYCGpHHQ',
	},
	{
		name: 'Anderea',
		surname: 'Lohmeyer',
		email: 'alohmeyer2l@google.ru',
		password: '2lUTLC8sTs',
	},
	{
		name: 'Emanuele',
		surname: 'Belly',
		email: 'ebelly2m@google.fr',
		password: 'lygh93',
	},
	{
		name: 'Tatum',
		surname: 'Lowdiane',
		email: 'tlowdiane2n@storify.com',
		password: 'Vcv4lQT4EL',
	},
	{
		name: 'Alvy',
		surname: 'Wayland',
		email: 'awayland2o@goodreads.com',
		password: 'BCgKZwR',
	},
	{
		name: 'Abbie',
		surname: 'Fearenside',
		email: 'afearenside2p@china.com.cn',
		password: 'GehkZG',
	},
	{
		name: 'Wyn',
		surname: 'Burroughes',
		email: 'wburroughes2q@trellian.com',
		password: 'OzmKiWzdWC',
	},
	{
		name: 'Sydelle',
		surname: 'Flott',
		email: 'sflott2r@prweb.com',
		password: 'fHOcmRaAQq5s',
	},
	{
		name: 'Etta',
		surname: 'Consterdine',
		email: 'econsterdine2s@youku.com',
		password: '1TGXEr',
	},
	{
		name: 'Corilla',
		surname: 'Ruby',
		email: 'cruby2t@t-online.de',
		password: 'XoEBh1ULc8',
	},
	{
		name: 'Tallulah',
		surname: 'Attwell',
		email: 'tattwell2u@howstuffworks.com',
		password: 'nEvp9W7530P',
	},
	{
		name: 'Courtnay',
		surname: 'Headland',
		email: 'cheadland2v@who.int',
		password: 'ErHWlRn5Jguf',
	},
	{
		name: 'Blanca',
		surname: 'Kinsell',
		email: 'bkinsell2w@stanford.edu',
		password: 'dtD2boy1',
	},
	{
		name: 'Claude',
		surname: 'Grumley',
		email: 'cgrumley2x@noaa.gov',
		password: '07GMzE71',
	},
	{
		name: 'Donni',
		surname: 'Skelding',
		email: 'dskelding2y@nymag.com',
		password: '46iAo8yIm5gf',
	},
	{
		name: 'Allsun',
		surname: 'Fosserd',
		email: 'afosserd2z@blogspot.com',
		password: 'FfOLrm',
	},
	{
		name: 'Evanne',
		surname: 'Corbould',
		email: 'ecorbould30@surveymonkey.com',
		password: 'mG3RFAetGSaG',
	},
	{
		name: 'Armand',
		surname: 'Tourville',
		email: 'atourville31@hugedomains.com',
		password: '39Vhuxdp3',
	},
	{
		name: 'Katina',
		surname: 'Botler',
		email: 'kbotler32@google.co.jp',
		password: 'AXOTSfqx',
	},
	{
		name: 'Cole',
		surname: 'Threlfall',
		email: 'cthrelfall33@youtube.com',
		password: 'W5VvS4',
	},
	{
		name: 'Harlie',
		surname: 'Knock',
		email: 'hknock34@phpbb.com',
		password: 'dp3rFDBNvOR',
	},
	{
		name: 'Ashli',
		surname: 'Gomar',
		email: 'agomar35@ask.com',
		password: 'snZDS7rj',
	},
	{
		name: 'Che',
		surname: 'Bachman',
		email: 'cbachman36@uiuc.edu',
		password: 'utfzWP',
	},
	{
		name: 'Eirena',
		surname: 'Tousy',
		email: 'etousy37@wix.com',
		password: 'BfVcLqrr',
	},
	{
		name: 'Friedrick',
		surname: 'Klaaassen',
		email: 'fklaaassen38@wired.com',
		password: 'NXp9dq4',
	},
	{
		name: 'Leonanie',
		surname: 'Jeves',
		email: 'ljeves39@wunderground.com',
		password: 'LDNSTBOJR',
	},
	{
		name: 'Sherwynd',
		surname: 'MacCollom',
		email: 'smaccollom3a@opera.com',
		password: 'ElpmPW7giP',
	},
	{
		name: 'Othilia',
		surname: 'Le Houx',
		email: 'olehoux3b@seesaa.net',
		password: 's98AeFT7',
	},
	{
		name: 'Cal',
		surname: 'Kanter',
		email: 'ckanter3c@dell.com',
		password: 'w0D8f74',
	},
	{
		name: 'Cynthea',
		surname: 'Infantino',
		email: 'cinfantino3d@sitemeter.com',
		password: 'NfWkMhhiXQTZ',
	},
	{
		name: 'Cherianne',
		surname: 'Cleal',
		email: 'ccleal3e@japanpost.jp',
		password: 'myXfnfaD24B',
	},
	{
		name: 'Miguela',
		surname: 'Hearnes',
		email: 'mhearnes3f@webs.com',
		password: '2X1NGKf1ff',
	},
	{
		name: 'Corissa',
		surname: 'Battleson',
		email: 'cbattleson3g@reddit.com',
		password: 'sGPVJ3BR29',
	},
	{
		name: 'Ulla',
		surname: 'Calan',
		email: 'ucalan3h@apple.com',
		password: '4pOilAMeZ',
	},
	{
		name: 'Gerry',
		surname: 'Rembaud',
		email: 'grembaud3i@bbc.co.uk',
		password: 'b9NysadzUfI',
	},
	{
		name: 'Zach',
		surname: 'Kuzma',
		email: 'zkuzma3j@ibm.com',
		password: '4R9tznZq8s',
	},
	{
		name: 'Issy',
		surname: 'Lawley',
		email: 'ilawley3k@sciencedirect.com',
		password: 'kv0XJ9Ct',
	},
	{
		name: 'Sherri',
		surname: 'Tinghill',
		email: 'stinghill3l@jiathis.com',
		password: 'On2AngyIuab',
	},
	{
		name: 'Alon',
		surname: 'Noquet',
		email: 'anoquet3m@opensource.org',
		password: 'DZooHH5',
	},
	{
		name: 'Bancroft',
		surname: 'Ducaen',
		email: 'bducaen3n@disqus.com',
		password: 'pEBWLf9',
	},
	{
		name: 'Garret',
		surname: 'Mursell',
		email: 'gmursell3o@geocities.com',
		password: 'RTNwGzyY',
	},
	{
		name: 'Jourdan',
		surname: 'Semered',
		email: 'jsemered3p@cnn.com',
		password: '8FgByetke1Z',
	},
	{
		name: 'Dotti',
		surname: 'Walduck',
		email: 'dwalduck3q@prlog.org',
		password: 'bilrTaUb',
	},
	{
		name: 'Helyn',
		surname: 'Ackland',
		email: 'hackland3r@surveymonkey.com',
		password: 'dlWihKpNJ',
	},
	{
		name: 'Dallas',
		surname: 'Asals',
		email: 'dasals3s@google.cn',
		password: 'R9BiHA',
	},
	{
		name: 'Blair',
		surname: "O'Neill",
		email: 'boneill3t@berkeley.edu',
		password: 'DmP1x9n1naV3',
	},
	{
		name: 'Gale',
		surname: 'Hyndson',
		email: 'ghyndson3u@posterous.com',
		password: 'hAeEgxpJfS',
	},
	{
		name: 'Sholom',
		surname: 'Wiburn',
		email: 'swiburn3v@fc2.com',
		password: 'hu7B9xjLJOPj',
	},
	{
		name: 'Kaye',
		surname: 'Pretsel',
		email: 'kpretsel3w@hibu.com',
		password: 'HPUPJAaVkCK',
	},
	{
		name: 'Ronnie',
		surname: 'Algy',
		email: 'ralgy3x@google.com.br',
		password: 'VJGHexMa',
	},
	{
		name: 'Fanechka',
		surname: 'Mabley',
		email: 'fmabley3y@sciencedaily.com',
		password: 'bZj6bHFPkxS',
	},
	{
		name: 'Humphrey',
		surname: 'Sheeres',
		email: 'hsheeres3z@creativecommons.org',
		password: '168UvTY5',
	},
	{
		name: 'Janie',
		surname: 'Goneau',
		email: 'jgoneau40@t-online.de',
		password: 'UjagpzV',
	},
	{
		name: 'Reggie',
		surname: 'Comello',
		email: 'rcomello41@joomla.org',
		password: 'IdVix63Yk',
	},
	{
		name: 'Virgie',
		surname: 'Pilkinton',
		email: 'vpilkinton42@drupal.org',
		password: 'MHDRB2o',
	},
	{
		name: 'Nickie',
		surname: 'Critcher',
		email: 'ncritcher43@de.vu',
		password: 's02eS7tSIO1',
	},
	{
		name: 'Laurice',
		surname: 'Beeck',
		email: 'lbeeck44@nih.gov',
		password: 'tuoDwOM',
	},
	{
		name: 'Barton',
		surname: 'Westmorland',
		email: 'bwestmorland45@columbia.edu',
		password: 'NmpoMfsl2',
	},
	{
		name: 'Perrine',
		surname: 'Duerden',
		email: 'pduerden46@google.com.au',
		password: 'pxGLwuLuT7',
	},
	{
		name: 'Con',
		surname: 'Hasel',
		email: 'chasel47@so-net.ne.jp',
		password: 'zCtstt',
	},
	{
		name: 'Meade',
		surname: 'Esmonde',
		email: 'mesmonde48@wordpress.org',
		password: 'cNSexKY5Inw',
	},
	{
		name: 'Perl',
		surname: 'Swadlin',
		email: 'pswadlin49@fda.gov',
		password: 'SKlE03fO',
	},
	{
		name: 'Fran',
		surname: 'Farlamb',
		email: 'ffarlamb4a@gizmodo.com',
		password: 'irMOTusB9T',
	},
	{
		name: 'Dennie',
		surname: 'Howkins',
		email: 'dhowkins4b@tiny.cc',
		password: 'YbFNmKAXkV',
	},
	{
		name: 'Munroe',
		surname: 'Chicchetto',
		email: 'mchicchetto4c@yolasite.com',
		password: 'HGR9jmLrk',
	},
	{
		name: 'Krispin',
		surname: 'Uttridge',
		email: 'kuttridge4d@studiopress.com',
		password: 'nmMSsJbcz',
	},
	{
		name: 'Rycca',
		surname: 'Smickle',
		email: 'rsmickle4e@comsenz.com',
		password: 'ZrNlj5',
	},
	{
		name: 'Leon',
		surname: 'Barr',
		email: 'lbarr4f@tripadvisor.com',
		password: 'Hfzs6Zllm',
	},
	{
		name: 'Amii',
		surname: 'Yurchishin',
		email: 'ayurchishin4g@twitpic.com',
		password: 'i0EIghWc8tIE',
	},
	{
		name: 'Dianemarie',
		surname: 'Kruszelnicki',
		email: 'dkruszelnicki4h@fotki.com',
		password: 'NXyOw0udJ8d',
	},
	{
		name: 'Reinald',
		surname: 'Corry',
		email: 'rcorry4i@meetup.com',
		password: 'zanibFxZU50r',
	},
	{
		name: 'Rickey',
		surname: 'Ornelas',
		email: 'rornelas4j@umn.edu',
		password: 'e7uhXLoj',
	},
	{
		name: 'Valentina',
		surname: "L'oiseau",
		email: 'vloiseau4k@google.it',
		password: '5hrAkosipP',
	},
	{
		name: 'Ardelis',
		surname: 'Lafrentz',
		email: 'alafrentz4l@disqus.com',
		password: 'cd7IQh8qgE',
	},
	{
		name: 'Rollins',
		surname: 'Taylor',
		email: 'rtaylor4m@patch.com',
		password: '8NahNg',
	},
	{
		name: 'Arlyne',
		surname: "O'Loghlen",
		email: 'aologhlen4n@google.nl',
		password: 'mMJk20fTY',
	},
	{
		name: 'Halsey',
		surname: 'Myott',
		email: 'hmyott4o@google.ru',
		password: 'UrA2yRvV',
	},
	{
		name: 'Rinaldo',
		surname: 'Yerborn',
		email: 'ryerborn4p@bloglovin.com',
		password: 'LEVvXWB0q3',
	},
	{
		name: 'Legra',
		surname: 'Simonetto',
		email: 'lsimonetto4q@nyu.edu',
		password: 'I2odjR',
	},
	{
		name: 'Chickie',
		surname: 'Walenta',
		email: 'cwalenta4r@blinklist.com',
		password: 'gGrGiBJK8',
	},
	{
		name: 'Connie',
		surname: 'Farans',
		email: 'cfarans4s@ning.com',
		password: 'XOWy5T',
	},
	{
		name: 'Kriste',
		surname: 'Geal',
		email: 'kgeal4t@skype.com',
		password: 'ikoCN1',
	},
	{
		name: 'Gino',
		surname: 'Grigorio',
		email: 'ggrigorio4u@geocities.jp',
		password: 'F5MYiL',
	},
	{
		name: 'Jordain',
		surname: 'Hedon',
		email: 'jhedon4v@mlb.com',
		password: 'y3xHnPR',
	},
	{
		name: 'Modesty',
		surname: 'Jerratsch',
		email: 'mjerratsch4w@cdbaby.com',
		password: 'tmjBYw7PL',
	},
	{
		name: 'Tommy',
		surname: 'Hursthouse',
		email: 'thursthouse4x@about.com',
		password: 'TWXgi2mf1ki',
	},
	{
		name: 'Clary',
		surname: 'Breadmore',
		email: 'cbreadmore4y@posterous.com',
		password: 'rTKpNkg',
	},
	{
		name: 'Benjie',
		surname: 'Sarton',
		email: 'bsarton4z@noaa.gov',
		password: 'CMsG5D0XBJ',
	},
	{
		name: 'Mead',
		surname: 'Quail',
		email: 'mquail50@trellian.com',
		password: 'vTcL1kkqQtb',
	},
	{
		name: 'Ingrid',
		surname: 'Sherreard',
		email: 'isherreard51@de.vu',
		password: '8nbXll8bRJos',
	},
	{
		name: 'Cherice',
		surname: 'Ead',
		email: 'cead52@elegantthemes.com',
		password: 'XLWbeSkz30d',
	},
	{
		name: 'Helga',
		surname: 'Scruton',
		email: 'hscruton53@xing.com',
		password: 'D8x6q6',
	},
	{
		name: 'Salvidor',
		surname: 'Huggill',
		email: 'shuggill54@princeton.edu',
		password: 'uU7kvb',
	},
	{
		name: 'Benita',
		surname: 'Fabry',
		email: 'bfabry55@elegantthemes.com',
		password: 'bLUyXcK',
	},
	{
		name: 'Giles',
		surname: 'Kelly',
		email: 'gkelly56@cdc.gov',
		password: 'mGyoKhpG',
	},
	{
		name: 'Guinevere',
		surname: 'Attwooll',
		email: 'gattwooll57@devhub.com',
		password: '57eE110Go7',
	},
	{
		name: 'Dinnie',
		surname: 'Thaxton',
		email: 'dthaxton58@arizona.edu',
		password: 'xJqncOEV60',
	},
	{
		name: 'Boigie',
		surname: 'Judron',
		email: 'bjudron59@theatlantic.com',
		password: 'AGs9bTTB',
	},
	{
		name: 'Ruggiero',
		surname: 'Thorby',
		email: 'rthorby5a@washington.edu',
		password: 'eFPXlnnrL',
	},
	{
		name: 'Moritz',
		surname: 'Daysh',
		email: 'mdaysh5b@cargocollective.com',
		password: 'KHyyYEzEHdRb',
	},
	{
		name: 'Hi',
		surname: 'Heaysman',
		email: 'hheaysman5c@hibu.com',
		password: 'ohamRZ',
	},
	{
		name: 'Henryetta',
		surname: 'Rykert',
		email: 'hrykert5d@yellowbook.com',
		password: 'rPWjP3',
	},
	{
		name: 'Griselda',
		surname: 'Wernham',
		email: 'gwernham5e@cnet.com',
		password: 'MM7eZJ9JkZ',
	},
	{
		name: 'Malvina',
		surname: 'Mulcock',
		email: 'mmulcock5f@statcounter.com',
		password: 'ZtneFRo',
	},
	{
		name: 'Milt',
		surname: 'Elsie',
		email: 'melsie5g@home.pl',
		password: 'zeDJuHOkO7Fc',
	},
	{
		name: 'Giraud',
		surname: 'Pettican',
		email: 'gpettican5h@ihg.com',
		password: 'oCNSIccb8E',
	},
	{
		name: 'Fabian',
		surname: 'Broome',
		email: 'fbroome5i@nymag.com',
		password: 'UxXnDVDgED',
	},
	{
		name: 'Cacilie',
		surname: 'Amsden',
		email: 'camsden5j@cocolog-nifty.com',
		password: 'PSfgQvTRy8UA',
	},
];

const userOrganization = [
	{
		name: 'Timoteo',
		surname: 'Bussens',
		email: 'tbussens0@census.gov',
		password: 'o1Wcmy3b5',
		organizationId: 1,
	},
	{
		name: 'Shanie',
		surname: 'Wagner',
		email: 'swagner1@wordpress.com',
		password: 'sg4Ib2Jp',
		organizationId: 2,
	},
	{
		name: 'Madelene',
		surname: 'Snel',
		email: 'msnel2@princeton.edu',
		password: 'yRws8Z1hoy',
		organizationId: 3,
	},
	{
		name: 'Glenna',
		surname: 'Losemann',
		email: 'glosemann3@bloglovin.com',
		password: 'BSbtR67vB4',
		organizationId: 4,
	},
	{
		name: 'Darin',
		surname: 'Krink',
		email: 'dkrink4@meetup.com',
		password: 'OreJahKPGyE6',
		organizationId: 5,
	},
	{
		name: 'Ced',
		surname: 'Asling',
		email: 'casling5@upenn.edu',
		password: 'b7tIU4z4oYee',
		organizationId: 6,
	},
	{
		name: 'Gloriane',
		surname: 'Whelan',
		email: 'gwhelan6@economist.com',
		password: 'xYI5arQmn',
		organizationId: 7,
	},
	{
		name: 'Abelard',
		surname: 'Linacre',
		email: 'alinacre7@uiuc.edu',
		password: 'ofnat1pO',
		organizationId: 8,
	},
	{
		name: 'Traver',
		surname: 'Bourne',
		email: 'tbourne8@oakley.com',
		password: 'vmGvq4Cg3',
		organizationId: 9,
	},
	{
		name: 'Hyacinthia',
		surname: 'Neesham',
		email: 'hneesham9@nymag.com',
		password: 'EdpCqD',
		organizationId: 10,
	},
];

const {
	Event,
	Date,
	Organization,
	EventLocation,
	Ticket,
	User,
	Location,
	Category,
	EventCategory,
	City,
	UserRole,
} = sequelize.models;

export async function MockData() {
	Promise.all([
		Organization.bulkCreate(organization),
		City.bulkCreate(cities),
		Category.bulkCreate(categories),
	]).then(async (result) => {
		await Location.bulkCreate(locations);
		events = events.map((event: any) => {
			return {
				...event,
				background_image:
					images[Math.floor(Math.random() * (images.length - 1) + 1)],
			};
		});
		let eventcreated = await Event.bulkCreate(events);
		await EventLocation.bulkCreate(eventLocations);
		await Date.bulkCreate(dates);

		let userscreated = await User.bulkCreate(users);

		for (let i = 0; i < userscreated.length; i++) {
			await UserRole.create({
				userId: userscreated[i].getDataValue('id'),
				roleId: 1010,
			});
		}

		let userOrganizationcreated = await User.bulkCreate(userOrganization);

		for (let i = 0; i < userOrganizationcreated.length; i++) {
			await UserRole.create({
				userId: userOrganizationcreated[i].getDataValue('id'),
				roleId: 1010,
			});
			await UserRole.create({
				userId: userOrganizationcreated[i].getDataValue('id'),
				roleId: 2020,
			});
		}

		for (let i = 0; i < eventcreated.length; i++) {
			await EventCategory.create({
				eventId: eventcreated[i].getDataValue('id'),
				categoryId: Math.floor(Math.random() * (6 - 1) + 1),
			});
		}
	});
}

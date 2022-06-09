import { sequelize } from "../api/src/db"

const organization = [
	{name: "Netherlands"},
	{name: "South Africa"},
	{name: "Spain"},
	{name: "United States"},
	{name: "Sweden"},
	{name: "Germany"},
	{name: "France"},
	{name: "Singapore"},
	{name: "Argentina"},
	{name: "Costa Rica"}
]

const locations = [
{id:1,name:"Cerrillos",address:"46 Mandrake Crossing"},
{id:2,name:"São Sebastião do Paraíso",address:"79 Blaine Point"},
{id:3,name:"Tampere",address:"57355 Gina Lane"},
{id:4,name:"Santa Cruz das Flores",address:"1512 Brickson Park Road"},
{id:5,name:"Dzüünbulag",address:"342 Larry Center"},
{id:6,name:"Irbit",address:"50373 Butterfield Plaza"},
{id:7,name:"Berëzovka",address:"442 Bunting Pass"},
{id:8,name:"Ivanivka",address:"2319 Forster Park"},
{id:9,name:"Mymensingh",address:"3954 Ilene Terrace"},
{id:10,name:"Périgueux",address:"34 Thierer Circle"},
{id:11,name:"Brudzew",address:"55 Springview Avenue"},
{id:12,name:"Vale de Madeiros",address:"3999 Claremont Road"},
{id:13,name:"Hubei",address:"33 Briar Crest Hill"},
{id:14,name:"San Marcos",address:"13973 Upham Court"},
{id:15,name:"Hutang",address:"9623 Fisk Circle"},
{id:16,name:"Catungawan Sur",address:"31642 Loomis Parkway"},
{id:17,name:"Makedonski Brod",address:"20 Aberg Place"},
{id:18,name:"Antsiranana",address:"0 Granby Pass"},
{id:19,name:"Katabu",address:"89030 Dennis Street"},
{id:20,name:"Nové Sedlo",address:"98 Tony Circle"}
]

const events = [
{id:1,name:"Road North (Tie pohjoiseen)",description:"diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:2,name:"Survival Island (Three)",description:"Maecenas triantetrices, erat tortor sollicitudin mi, .",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:3,name:"Crows Zero II (Kurôzu Zero II)",description:"justo, lacinia eget, tincidunt eget, tempus vel, pede.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:4,name:"Finding Vivian Maier",description:".\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget .",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:5,name:"Geek Charming",description:"ula ipiscing molestie, hnti. In eleifend quam a odio. In hac habitasse platea dictumst.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:6,name:"Resurrected, The",description:" orbi porttit Etiam faucibus cursus urna. Ut tellus.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:7,name:"The Hire: Beat the Devil",description:"um primis in faucib.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:8,name:"Chocchan's Story (Chocchan monogatari)",description:"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem..",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:9,name:"Babymother",description:"sollicitudin vitae, consectetuer eger pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:10,name:"Under Ten Flags",description:"s nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:11,name:"Bachelor in Paradise",description:"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:12,name:"Dead in Tombstone",description:"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:13,name:"Jim Jefferies: Fully Functional (EPIX)",description:"Cras mi pede, malesuada in, imperdiet et, com",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:14,name:"Am Ende eiens viel zu kurzen Tages (Death of a superhero)",description:"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:15,name:"The Hire: Follow, The",description:"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:16,name:"Screaming Man, A (Un homme qui crie)",description:"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:17,name:"Happening, The",description:"nas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu s",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:18,name:"Ice Station Zebra",description:"Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:19,name:"Last of the Unjust, The (Dernier des injustes, Le)",description:"Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gr",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
{id:20,name:"The Land",description:"Lorem ipsum dolor sit amet, consectetuer",background_image:"https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/muerdo-buenosaires-900x400-ticketek.png"},
]

const dates = [
	{
        id: 1,
        date: "10/10/2021",
        price: 1289,
		locationId: 3,
		eventId: 1
      }, {
        id: 2,
        date: "15/9/2021",
        price: 1759,
		locationId:3,
		eventId: 1
      }, {
        id: 3,
        date: "27/4/2022",
        price: 931,
		locationId:5 ,
		eventId: 4
      }, {
        id: 4,
        date: "27/9/2021",
        price: 660,
		locationId: 7,
		eventId: 6
      }, {
        id: 5,
        date: "6/6/2021",
        price: 1507,
		locationId: 10,
		eventId: 4
      }
]

const categories = [
{name: "Infantil"},
{name: "Deportes"},
{name: "Musical"},
{name: "Teatro"},
{name: "Especiales"}
]

const users = [
{id:1,name:"Bartholomeus",email:"bstibbs0@over-blog.com"},
{id:2,name:"Catha",email:"cgraver1@spotify.com"},
{id:3,name:"Paul",email:"pburburough2@mozilla.com"},
{id:4,name:"Holly-anne",email:"hmurricanes3@wisc.edu"},
{id:5,name:"Verge",email:"vabram4@ed.gov"},
{id:6,name:"Tricia",email:"tharnell5@behance.net"},
{id:7,name:"Michele",email:"mors6@go.com"},
{id:8,name:"Cleavland",email:"clarderot7@tamu.edu"},
{id:9,name:"Indira",email:"iprobert8@prnewswire.com"},
{id:10,name:"Jacky",email:"jwarbey9@sphinn.com"},
{id:11,name:"Tobey",email:"tsuttya@cmu.edu"},
{id:12,name:"Lauree",email:"leastbrookb@amazon.de"},
{id:13,name:"Libbie",email:"lcoardc@theatlantic.com"},
{id:14,name:"Rasla",email:"rwernhamd@npr.org"},
{id:15,name:"Dodi",email:"dbumphriese@themeforest.net"},
{id:16,name:"Rozele",email:"raccumf@nymag.com"},
{id:17,name:"Mechelle",email:"mpitchfordg@netlog.com"},
{id:18,name:"Tom",email:"thuntlyh@ca.gov"},
{id:19,name:"Kai",email:"kshillinglawi@tripadvisor.com"},
{id:20,name:"Abbott",email:"asamwysej@ted.com"},
]

const {Event, Date, Organization, Ticket, User, Location, Category, EventCategory, UserRole} = sequelize.models


export async function MockData(){

    Promise.all([Organization.bulkCreate(organization), Location.bulkCreate(locations), Category.bulkCreate(categories)])
    .then(async result => {
        let event = await Event.bulkCreate(events)
        let user = await User.bulkCreate(users)
        
		let organizationId = [4,2,2,10,3,1,7,10,6,9,3,8,4,1,5,7,9,9,3,10]
		let categoriesId = [3,1,3,5,2,4,1,1,2,3,4,1,3,4,2,5,5,4,3,2]
		for (let i = 0; i < event.length; i++) {
			await event[i].update({organizationId: Math.floor(Math.random() * (11 - 1) + 1)})
			await EventCategory.create({eventId: event[i].getDataValue("id"), categoryId: categoriesId[i]})
		}

    let rolesId = [1010, 2020, 3030]
    for (let i = 0 ; i < users.length ; i++){
      // await UserRole.create({userId: user[i].getDataValue('id'), roleId: rolesId[Math.floor((Math.random() * (3)))]})
      await UserRole.create({userId: user[i].getDataValue('id'), roleId: 1010})
      await UserRole.create({userId: user[i].getDataValue('id'), roleId: 2020})
    }

		await Date.bulkCreate(dates)

		
    })

}
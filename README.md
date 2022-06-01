# Webbshop

This mocked online store comme ci comme ça is an upgrade to the previous version. Previously we had our data saved in a local file and local storage, and in this update we have built the fully functional backend that allows to all the data saved and handled through MongoDB. We have also created 2 different user rights - admin and user. Admin can add, edit or delete any products and have an overall to the orders, while a user can sign up an account and place an order.

This project was built with React / TypeScript with MUI in the front end, and Express, NodeJS, MongoDB, Mongoose and Multer in the backend.

[To repo](https://github.com/millie-wy/slutprojekt-webbshop "Webbshop")

### Developers

Erik Isaksson (https://github.com/Erikisak) </br>
Ella Larsson (https://github.com/EllaMiri) </br>
Fia Andersson (https://github.com/fiababiakandersson) </br>
Millie Cheung (https://github.com/millie-wy)

## Getting started

### Step 1:

In directory **server**, run:  
`npm i` to install all dependencies

Then in the same directory, run: `npm start`

### Step 2:

Open a new terminal window and in directory **client**, run:  
`npm i` to install all dependencies.

Then in the same directory, run: `npm start`

---

Krav för godkänt:

- [ X ] Alla sidor skall vara responsiva. (G) - Granskade och justerade varje sida ner till 320px.
- [ X ] Arbetet ska implementeras med en React frontend och en Express backend. (G) - Vi använde React på client och Express på server.
- [ X ] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G) - Vi skapade båda diagrammen med hjälp av Draw.IO.
- [ X ] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G) - Skrev ner vår idé tillsammans.
- [ X ] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G) - Genom funktionerna i varje route, och med hjälp av middlewares som encryptedPassword och cookieSession.
- [ X ] Man ska kunna logga in som administratör i systemet (G) - Med hjälp av isAdmin boolean.
- [ X ] Inga Lösenord får sparas i klartext i databasen (G) - Använde kryptering av lösenorden.
- [ X ] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G) - Vi använde formik för att validera användarinmatningarna och formade sedan värdena till ett objekt och skickade det till backend för att skapa en order.
- [ X ] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G) - Vi behöll admin-sidan som redan fanns och gjorde på liknande sätt som när man gör en beställning fast mot en annan endpoint i backend.
- [ X ] Administratörer ska kunna se en lista på alla gjorda beställningar (G) - Fetch alla ordrar till klientsidan från databasen, ordrarna mappas ut.
- [ X ] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G) - I produktmodellen finns kategori som vi använder för att dela upp produkterna i kategorier.
- [ X ] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G) - Vi la till knappar för de olika kategorierna på klientsidan och när man klickar så körs en funktion som filtrerar produkterna så att endast de produkter som finns i kategorin du klickat på visas.
- [ X ] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G) - Använde local-storage för kundvagnen.
- [ X ] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G) - Med hjälp av currentUser som kollar om någon är inloggad, är man inloggad kan man gå vidare med köpet, är man inte så blir man bedd att logga in eller registrera ett konto.
- [ X ] Besökare ska kunna välja ett av flera fraktalternativ (G) - Med hjälp av formulär.
- [ X ] Tillgängliga fraktalternativ ska vara hämtade från databasen (G) - Fetch till klientsidan.
- [ X ] Checkout flödet i frontendapplikationen ska ha validering på samtliga fält (G) - Med hjälp av formik.

Krav för välgodkänt:

- [ ] Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)
- [ ] En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)
- [ ] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
- [ ] Administratörer ska kunna markera beställningar som skickade (VG)
- [ X ] Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG) - La in den som en del av att uppdatera produkten, vid samma sida där man uppdaterar lagersaldot.
- [ X ] Administratörer ska kunna lägga till och ta bort produkter (VG) - Vi använde vår addProductForm komponent med formik validering som gör att administratören kan fylla i detaljerna för en ny produkt och ladda upp en bild, när man trycker på submit-knappen aktiverar den endpointen för POST i backend. "Radera" liknar redigera en produkt men vi aktiverar en annan endpoint för DELETE istället.
- [ X ] Backendapplikationen måste ha en fungerande global felhantering (VG) - Skapade en felhanterare som täcker applikationen och fångar upp fel.

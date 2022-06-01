# Webbshop

This mocked online store comme ci comme ça is an upgrade to the previous version. Previously we had our data saved in a local file and local storage, and in this update we have built the fully functional backend that allows to all the data saved and handled through MongoDB. We have also created 2 different user rights - admin and user. Admin can add, edit or delete any products and have an overall to the orders, while a user can sign up an account and place an order.

This project was built with React / TypeScript with MUI in the front end, and Express, NodeJS, MongoDB, Mongoose and Multer in the backend.

[To repo](https://github.com/millie-wy/slutprojekt-webbshop "Webbshop")

### Developers

Erik Isaksson (https://github.com/Erikisak) </br>
Ella Larsson (https://github.com/EllaMiri) </br>
Fia Andersson (https://github.com/fiababiakandersson) </br>
Millie Cheung (https://github.com/millie-wy)

### Getting started

#### Install & Run

Run both client and server in parallel

```
npm install
npm start
```

#### Installation in two tabs

Open two terminals and run the following commands

```
npm run client-install
npm run server-install
```

#### Run project in two tabs

Open two terminals and run the following commands

```
npm run client
npm run server
```

---

Krav för godkänt:

- [ ] Alla sidor skall vara responsiva. (G)
- [ ] Arbetet ska implementeras med en React frontend och en Express backend. (G)
- [ ] Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet (G)
- [ ] Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
- [ ] All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
- [ ] Man ska kunna logga in som administratör i systemet (G)
- [ ] Inga Lösenord får sparas i klartext i databasen (G)
- [ ] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
- [ ] Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
- [ ] Administratörer ska kunna se en lista på alla gjorda beställningar (G)
- [ ] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
- [ ] Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
- [ ] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
- [ ] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)
- [ ] Besökare ska kunna välja ett av flera fraktalternativ (G)
- [ ] Tillgängliga fraktalternativ ska vara hämtade från databasen (G)
- [ ] Checkout flödet i frontendapplikationen ska ha validering på samtliga fält (G)

Krav för välgodkänt:

- [ ] Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)
- [ ] En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)
- [ ] När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
- [ ] Administratörer ska kunna markera beställningar som skickade (VG)
- [ ] Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)
- [ ] Administratörer ska kunna lägga till och ta bort produkter (VG)
- [ ] Backendapplikationen måste ha en fungerande global felhantering (VG)

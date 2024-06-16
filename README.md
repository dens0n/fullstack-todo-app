# Fullstack ToDo app

## Installation

1. Skapa en .env-fil i roten av servermappen och lägg till Postgresdatabas länken:

    ```bash
    DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:PORT/DBNAME?schema=public"
    ```

2. Klona projektet från GitHub till din lokala dator:

    ```bash
    git clone https://github.com/dens0n/fullstack-todo-app.git
    ```

3. Gå in i klientmappen:

    ```bash
    cd fullstack-todo-app/client
    ```

4. Installera alla nödvändiga beroenden:

    ```bash
    npm install
    ```

5. Starta utvecklingsservern:

    ```bash
    npm run dev
    ```

6. Öppna en ny terminal och navigera till servermappen:

    ```bash
    cd fullstack-todo-app/server
    ```

7. Installera alla nödvändiga beroenden:

    ```bash
    npm install
    ```

8. Starta utvecklingsservern:

    ```bash
    npm run dev
    ```

Nu borde både klienten och servern vara igång och du kan besöka din applikation i webbläsaren.

## Felsökning

Om du stöter på problem under installationen eller körningen av projektet, kontrollera följande:

-   Att du har rätt version av Node.js och npm installerad.
-   Att alla beroenden har installerats korrekt genom att köra `npm install` igen både i klient- och servermappen.
-   Att du har skapat och korrekt konfigurerat .env-filen i servermappen.

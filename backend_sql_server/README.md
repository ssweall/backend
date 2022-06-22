Pour rendre l'app fonctionnelle :

### Création d'un .env

Le fichier .env contient :

```
DATABASE_URL="sqlserver://127.0.0.1:1433;database=nomdatabase;user=nomuser(sa de base);password=password;encrypt=DANGER_PLAINTEXT"
SERVER_PORT="5000"
```

Modifiez le password, le nom de la base de données et le nom du user.

Ensuite on installe les packages :

`npm install`

et on lance l'application avec :

`npm run start`

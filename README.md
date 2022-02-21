### VIS TRAINING BACK-END

## INSTALL
        yarn dev

## START DEV
        yarn dev

## START PROD
        yarn start
    
## ENV VARS
        cp .env.exemplo .env

## STRUCTURE
        
            /src
                - /config // API settings 
                - /constants // constantes
                - /controllers // controls the flow of what goes in and out 
                - /database // connection with databases
                - /middlewares // functions that act before reaching the controller
                - /models // database models
                - /repositories // functions that act on the database
                - /routers // API routers
                - /usecase // business rules
                - /utils // functions used for code logic
                - app.js // run file
                - server.js // API base file
                
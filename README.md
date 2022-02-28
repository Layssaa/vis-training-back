## VIS TRAINING BACK-END

### INSTALL
        yarn dev

### START DEV
        yarn dev

### START PROD
        yarn start
    
### ENV VARS
        cp .env.exemplo .env
        
### SET ENV VARS
Uso do mailtrap para desenvolvimento/teste do envio dos emails para recuperação de senha
- Crie uma conta no [https://mailtrap.io/](https://mailtrap.io/)
- Crie uma caixa de entrada
- Ao clicar na caixa, vá em **Integrations**
- Selecione **Nodemailer**
- Coloque os valores nos respectivos campos. 

        MAILER_HOST=
        MAILER_PORT=
        MAILER_USER=
        MAILER_PASS=
        

### STRUCTURE
        
            /src
                - /config ---> API settings 
                - /constants ---> constantes
                - /controllers ---> controls the flow of what goes in and out 
                - /database ---> connection with databases
                - /middlewares ---> functions that act before reaching the controller
                - /models ---> database models
                - /repositories ---> functions that act on the database
                - /routers ---> API routers
                - /usecase ---> business rules
                - /utils ---> functions used for code logic
                - app.js ---> run file
                - server.js ---> API base file
                
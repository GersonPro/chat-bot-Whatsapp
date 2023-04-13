const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const saveLastMessage = (ctx) => {
  ctx.session.lastMessage = ctx.message.body;
}

// Función para repetir el último mensaje en caso de entrada inválida
const repeatLastMessage = (ctx) => {
  ctx.sendText(ctx.session.lastMessage);
}


const flowDocs = addKeyword(['1', 'uno', 'Uno']).addAnswer(
    [
        'En unos segundos te atenderá uno de nuestros agentes.'
    ]
).addAction((ctx) => {
    if (ctx.body === "Si") {
        console.log("Mensaje importante recibido. Enviando notificación...");
        // En este punto puedes agregar el código que necesitas para enviar la notificación
        exit();
    }
});


const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    [flowSecundario]
)
const flowPreciosH = addKeyword(['1','Uno', 'uno']).addAnswer(
    [
        'une Start *$ 500.000*',
        'two Star *$ 200.000*',
        'tree Star *$ 250.000*',
        'Four Star *$ 800.000*',
        '\n*Hola* Para volver atras'
    ],null,
    null

)
const flowPreciosM = addKeyword(['2','Dos', 'dos']).addAnswer(
    [
        'une Start *$ 550.000*',
        'two Star *$ 210.000*',
        'tree Star *$ 250.000*',
        'Four Star *$ 800.000*',
        '\n*Hola* Para volver atras'
    ],null,
    null

)
const flowZandalias = addKeyword(['3','tres', 'Tres']).addAnswer(
    [
        'une Start *$ 550.000*',
        'two Star *$ 210.000*',
        'tree Star *$ 250.000*',
        'Four Star *$ 800.000*',
        '\n*Hola* Para volver atras'
    ],null,
    null

)

const flowZapatosN = addKeyword(['4','cuatro', 'Cuatro']).addAnswer(
    [
        'une Start *$ 550.000*',
        'two Star *$ 210.000*',
        'tree Star *$ 250.000*',
        'Four Star *$ 800.000*',
        '\n*Hola* Para volver atras'
    ],null,
    null

)



const flowGracias = addKeyword(['2','Dos','dos']).addAnswer(
    [
        'Elije que tipo de Zapatos Buscas',
        '*1* Zapatos Hombre',
        '*2* Zapatos Mujer',
        '*3* Zandalias',
        '*4* Zapatos para niños',
        '\n*hola* Volver atras',
    ],
    null,
    null,
    [flowPreciosH, flowPreciosM, flowZandalias, flowZapatosN]
)



const flowDiscord = addKeyword(['3','Tres','tres']).addAnswer(
    ['Visita Nuestra Pagina Web', 'https://link.codigoencasa.com/DISCORD',
     ],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'oe', 'ola'])
    .addAnswer('🙌 hola buenos dias bienvenido a tu tienda de garabatos *')
    .addAnswer(
        [
            'elije las opciones',
            '*1.* quiero comunicarme con un agente *',
            '*2.* quiero ver los precios ',
            '*3.* visitare tu pagina web',
            
        ],
        null,
        null,
         
        [flowDocs, flowGracias, flowTuto, flowDiscord, flowPreciosH, ],
    )
   
 
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

"use strict";
require('dotenv').config()

Object.defineProperty(exports, "__esModule", { value: true });

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const Users = require("./js/db_users.js");
const Actions = require("./js/db_actions.js");

const adminsList = [
    '157371788'
];

const bot = new Telegraf(process.env.BOT_TOKEN)
const publishedModules = 3;
const publishedLections = 17;
bot.use(Telegraf.log())

const modules = [
    {
        name: 'МОДУЛЬ 1',
        imgLink: "https://static.tildacdn.com/tild3932-3366-4161-a565-646234653164/_1.png",
        link: "http://znohistory.ed-era.com/m1", 
        description: "Про розселення слов'ян, поділ земель, навалу монголів та появу перших козаків.", 
        lections: [
            { 
                number: "Лекція 1",
                fullname: "Вступ до історії України.",
                description: "Історія про те, що таке історія взагалі та як нам вдається вивчати те, що вже минуло.",
                link: "http://znohistory.ed-era.com/m1/l1",
                imgLink: "https://static.tildacdn.com/tild6561-3463-4039-b234-313962653133/1.png",
                audioLink:"https://fex.net/load/098504114963/1323870499"
            },
            { 
                number: "Лекція 2",
                fullname: "Стародавня історія України.",
                description: "Історія про те, як на українських землях з'явилися люди і вирішили тут лишитися.",
                link: "http://znohistory.ed-era.com/m1/l2",
                imgLink: "https://static.tildacdn.com/tild3864-3139-4363-b831-393537323937/1.png",
                audioLink:"https://fex.net/load/098504114963/1323870552"
            },
            { 
                number: "Лекція 3",
                fullname: "Київська держава.",
                description: "Історія про те, як князі землю ділили, шлюби укладали та з кочовиками воювали.",
                link: "http://znohistory.ed-era.com/m1/l3",
                imgLink: "https://static.tildacdn.com/tild6431-6333-4138-a233-303431656536/photo.png",
                audioLink:"https://fex.net/load/098504114963/1323870594"
            },
            { 
                number: "Лекція 4",
                fullname: "Галицько-Волинська держава. Монгольська навала.",
                description: "Історія про те, як Данило Галицький коронувався, а монголи вторглися на Русь.",
                link: "http://znohistory.ed-era.com/m1/l4",
                imgLink: "https://static.tildacdn.com/tild3037-3837-4137-a436-663030633539/photo.png",
                audioLink:"https://fex.net/load/098504114963/1323870625"
            },
            { 
                number: "Лекція 5",
                fullname: "Українські землі у другій половині XIV - першій половині XVI ст.",
                description: "Історія про війни, королів, козаків та Україну в складі іноземних держав.",
                link: "http://znohistory.ed-era.com/m1/l5",
                imgLink: "https://static.tildacdn.com/tild6331-3635-4636-b132-623133333263/photo.png",
                audioLink:"https://fex.net/load/098504114963/1323870660"
            }
        ],
        numberOfLections: 5,
        numberOfPublished: 5
    },
    {
        name: 'МОДУЛЬ 2',
        imgLink: "https://static.tildacdn.com/tild3361-3964-4532-b365-313161396665/2.png", 
        link: "http://znohistory.ed-era.com/m2", 
        fullname: "Друга половина ХVІ ст. – XVIII ст.",
        description: "Про утворення та занепад Речі Посполитої, війни, повстання, угоди та ліквідацію українського козацтва.", 
        lections: [
            { 
                number: "Лекція 6",
                fullname: "Українські землі у складі Речі Посполитої (друга половина XVI ст.)",
                description: "Історія про утворення Речі Постополитої, заснування Січі, Реформацію та Контрреформацію.",
                link: "http://znohistory.ed-era.com/m2/l6",
                imgLink: "https://static.tildacdn.com/tild6136-3232-4661-b037-386363306463/6.png",
                audioLink:"https://fex.net/load/526071777969/1323953141"
            },
            { 
                number: "Лекція 7",
                fullname: "Українські землі в складі Речі Посполитої (перша половина XVII ст.)",
                description: "Історія про козацькі походи, повстання, церковне життя та культуру українських земель.",
                link: "http://znohistory.ed-era.com/m2/l7",
                imgLink: "https://static.tildacdn.com/tild3839-3433-4238-a138-663734313263/photo.png",
                audioLink:"https://fex.net/load/526071777969/1323953183"
            },
            { 
                number: "Лекція 8",
                fullname: "Національно-визвольна війна під проводом Б. Хмельницького середини XVII ст.",
                description: "Історія про початок війни за незалежність, битви, угоди та перемир'я.",
                link: "http://znohistory.ed-era.com/m2/l8",
                imgLink: "https://static.tildacdn.com/tild6234-3036-4135-b737-646636303837/photo.png",
                audioLink:"https://fex.net/load/526071777969/1323953224"
            },
            { 
                number: "Лекція 9",
                fullname: "Українські землі наприкінці 50-их у 80-ті рр. XVII ст.",
                description: "Історія про роздробленість, війни та гетьманів, що надто часто змінювалися.",
                link: "http://znohistory.ed-era.com/m2/l9",
                imgLink: "https://static.tildacdn.com/tild3263-3130-4231-a635-306439653430/photo.png",
                audioLink:"https://fex.net/load/526071777969/1323953275"
            },
            { 
                number: "Лекція 10",
                fullname: "Українські землі наприкінці XVII - у першій половині XVIII століття.",
                description: "Історія про союз зі шведами, перемогу малоросійства та першу Конституцію.",
                link: "http://znohistory.ed-era.com/m2/l10",
                imgLink: "https://static.tildacdn.com/tild6532-6636-4366-a233-343361373332/photo.png",
                audioLink:"https://fex.net/load/526071777969/1323953319"
            },
            { 
                number: "Лекція 11",
                fullname: "Українські землі у другій половині XVIII ст.",
                description: "Історія про реформи ліквідацію козацтва, масштабні повтання та три поділи Речі Постополитої.",
                link: "http://znohistory.ed-era.com/m2/l11",
                imgLink: "https://static.tildacdn.com/tild3838-3236-4137-a437-323664373832/12.png",
                audioLink:"https://fex.net/load/526071777969/1323953375"
            }
        ],
        numberOfLections: 6,
        numberOfPublished: 6
    },
    {
        name: 'МОДУЛЬ 3',
        fullname: "XIX століття.",
        imgLink: "https://static.tildacdn.com/tild3364-6437-4164-b435-623331353435/Module_3.jpg",
        description: "Про українські землі в складі Російської та Австрійської імперій, національне відродження та українську культуру", 
        link: "http://znohistory.ed-era.com/m3",
        lections: [
            { 
                number: "Лекція 12",
                fullname: "Українські землі у складі Російської імперії наприкінці XVIII - у першій половині XIX ст.",
                description: "Історія про територіальні зміни, українське національне відродження та масонів.",
                link: "http://znohistory.ed-era.com/m3/l12",
                imgLink: "https://static.tildacdn.com/tild3566-3762-4666-a132-353332656639/12.png",
                audioLink:"https://fex.net/load/415830496302/1318278720"
            },
            { 
                number: "Лекція 13-14",
                fullname: "Західноукраїнські землі в складі Австрійської імперії наприкінці XVIII - у першій половині XIX ст., культура.",
                description: "Історія про весну народів, будителів та Руську трійцю.",
                link: "http://znohistory.ed-era.com/m3/l13-l14",
                imgLink: "https://static.tildacdn.com/tild3737-3133-4133-a437-336665613930/_-1.png",
                audioLink:"https://fex.net/load/415830496302/1318278767"
            },
            { 
                number: "Лекція 15",
                fullname: "Наддніпрянська Україна в другій половині XIX ст.",
                description: "Історія про реформи Олександра ІІ, індустріалізацію та заборону української мови",
                link: "http://znohistory.ed-era.com/m3/l15",
                imgLink: "https://static.tildacdn.com/tild6165-6536-4663-a339-653537636264/_15.png",
                audioLink:"https://fex.net/load/415830496302/1318278850"
            },
            { 
                number: "Лекція 16",
                fullname: "Західноукраїнські землі у складі Австро-Угорської імперії в другій половині XIX ст.",
                description: "Історія про український національний рух, діяльність інтелігенції та політичні партії",
                link: "http://znohistory.ed-era.com/m3/l16",
                imgLink: "https://static.tildacdn.com/tild3131-3363-4361-a539-326662313462/photo.png",
                audioLink:"https://fex.net/load/415830496302/1318278887"
            },
            { 
                number: "Лекція 17",
                fullname: "Культура України в другій половині XIX - на початку XX ст.",
                description: "Історія української культури про театр та музику, реалізм і модернізм",
                link: "http://znohistory.ed-era.com/m3/l17",
                imgLink: "https://static.tildacdn.com/tild6434-6461-4265-b932-623234633761/Lecturre17.png",
                audioLink:"https://fex.net/load/415830496302/1318278907"
            }
        ],
        numberOfLections: 5,
        numberOfPublished: 5
    }
];

bot.catch(function(err){ console.log(err); });

const modulesMenu = Telegraf.Extra
                    .markdown()
                    .markup((m) => m.keyboard([
                    m.callbackButton(modules[0].name),
                    m.callbackButton(modules[1].name),
                    m.callbackButton(modules[2].name)
                    ]).resize())

    bot.command('start', msg =>{
        msg.reply('Виберіть модуль:', modulesMenu);
        Users.add({
            _id: msg.from.id,
            first_name: msg.from.first_name,
            username: msg.from.username,
            last_name: msg.from.last_name,
            isAdmin: adminsList.includes(String(msg.from.id))
        }).catch(err => console.log(err));
        Actions.add({
            chat_id: msg.from.id,
            message: msg.message.text
        });
    })

    bot.hears(/\МОДУЛЬ (\d+)/, (ctx) => {
        Actions.add({
            chat_id: ctx.from.id,
            message: ctx.message.text
        });

        if(ctx.match[1] < 1 || ctx.match[1] > publishedModules)
            return ctx.reply("Такого модуля не існує або він ще не був опублікований 😔", modulesMenu);
        else
            return ctx.replyWithHTML(getModuleInfoHTML(ctx.match[1] - 1), getLectionsMenu(ctx.match[1]));
    })
    
    function getPodcastByLectionNumber(number){
        if(number < 6)
            return modules[1].lections[number-1].audioLink;
        else if(number < 12)
            return modules[1].lections[number-6].audioLink;
        else {
            return modules[2].lections[number-12].audioLink;
        }
    }

    bot.hears(/\Лекція (\d+)/, (ctx) => {
        Actions.add({
            chat_id: ctx.from.id,
            message: ctx.message.text
        });

        console.log("HEY HEY HEY " + ctx.match[1])
        if(ctx.match[1] < 1 || ctx.match[1] > publishedLections)
            return ctx.reply("Такої лекції не існує або вона ще не була опублікована 😔", modulesMenu);
        else{
            let lection = getLection("Лекція " + ctx.match[1])
            return ctx.replyWithHTML(getLectionInfoHTML(ctx.match[1]), ctx.replyWithAudio(lection.audioLink));
        }
            
    })

    bot.hears('⬅️ Назад', (ctx) => {
        ctx.reply('Виберіть модуль:', modulesMenu);
        Actions.add({
            chat_id: ctx.from.id,
            message: ctx.message.text
        });
    })

    function getModuleInfoHTML(number){
        return  "<b>" + modules[number].name + 
                "</b><a href=\'" + modules[number].imgLink + 
                "\'>.</a>\n\n<i>" + modules[number].description + 
                "</i>\n\n" + getLectionsListHTML(number) + "<a href=\'" + modules[number].link + 
                "\'>Переглянути лекції на сайті... </a>";
    };

    function getLectionInfoHTML(number){
        let neededLection = getLection("Лекція " + number);

        if (!neededLection)
            return "Такої лекції не існує або вона ще не була опублікована 😔";
        
            return  "<b>" + neededLection.number + 
                "</b><a style=\"text-decoration: none; color: black;\"href=\'" 
                + neededLection.imgLink + 
                "\'>: </a>" + neededLection.fullname +
                "\n\n<i>" + neededLection.description + 
                "</i>\n\n<a href=\'" + neededLection.link + 
                "\'>Переглянути лекцію на сайті... </a>";
    };

    function getLection(name) {
        let i = 0; // module
        let j = 0;
        while (i < modules.length && j < modules[i].numberOfLections){
            if(modules[i].lections[j].number.includes(name))
                return modules[i].lections[j];
            j++;
            if (j === modules[i].numberOfLections){
                i++;
                j = 0;
            }  
        }
        return false;
      }

      function getLectionsListHTML(moduleNumber){
        let lectionsList = "";
            modules[moduleNumber].lections.forEach(element => {
                let lectionString = "<b>" + element.number + ": </b><i>" + element.fullname + "</i>";
                lectionsList += lectionString;
                lectionsList += "\n";
            });
            lectionsList += "\n";
        return lectionsList;
    }; 

    function getLectionsMenu(moduleNumber){
        let lectionsList = [];
            modules[moduleNumber - 1].lections.forEach(element => {
                lectionsList.push(element.number);
            });
            lectionsList.push("⬅️ Назад")

            let lectionsMenu = Telegraf.Extra
                .markup((m) => m.keyboard(lectionsList).resize());
        console.log(lectionsMenu);
        return lectionsMenu;
    }; 

    /*
    bot.hears(/hey/, (msg) => {
        //if(adminsList.includes(msg.from.id))
            msg.replyWithHTML(getActionsStatsHTML());

        Actions.add({
            chat_id: msg.from.id,
            message: msg.message.text
        });
    })

    function getActionsStatsHTML(){
        let html = "";
        for (let i = 0; i < publishedModules; i++){
            getConcreteActionStatsHTML(i)
            .then(lectionsByModule => {
                let buf = "<b>" + modules[i].name + ": </b>\n" + lectionsByModule;
                html += buf;
                console.log("HOP HEY HOP " + html);
            })
        }

        html += "\n";

        console.log("HOP HEY LALALEY " + html);
        return html;
    };     

    function getConcreteActionStatsHTML(moduleNumber){

        return new Promise(function (resolve, reject) {
                let actionsForModule = "";

                modules[moduleNumber].lections.forEach(element => {
                    Actions.getQuantityByMessage(element.number)
                    .then(actionQuantity => {
                        let newStr = "<b>" + element.number + ": </b><i>" + actionQuantity + " звернень/ня</i>;\n";
                        actionsForModule += newStr;
                        console.log("MICKEY " + actionQuantity);
                    })
                    .catch(err => {
                        console.log(err);
                        let newStr = "<b>" + element.number + ": </b><i>0 звернень</i>;\n";
                        actionsForModule += newStr;
                        console.log("MINNEY " + actionQuantity);
                    })
                });
                actionsForModule += "\n";
                resolve(actionsForModule);
        });

        
    }; */

    bot.hears(/.*/, (msg) => {
        msg.reply("Не зрозумів... Скористайтеся, будь ласка, кнопками 🙃");
        Actions.add({
            chat_id: msg.from.id,
            message: msg.message.text
        });
    })

    bot.launch()
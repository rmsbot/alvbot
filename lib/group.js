if (ack == 3) {
    // The message was read
	}
});
client.on('group_join', async (notification) => {
	// User has joined or been added to the group. 
    console.log('join', notification);
    const botno = notification.chatId.split('@')[0];
    let number = await notification.id.remote;
    //client.sendMessage(number, `🤩 Hai , selamat datang di group ini 🤩`);
    const chats = await client.getChats();
    for (i in chats) {
        if (number == chats[i].id._serialized) {
            chat = chats[i];
        }
    }
    var participants = {};
    var admins = {};
    var i;
    for (let participant of chat.participants) {
        if (participant.id.user == botno) { continue; }
        //participants.push(participant.id.user);
        const contact = await client.getContactById(participant.id._serialized);
        participants[contact.pushname] = participant.id.user;
        // participant needs to send a message for it to be defined
        if (participant.isAdmin) {
            //admins.push(participant.id.user);
            admins[contact.pushname] = participant.id.user;
            //client.sendMessage(participant.id._serialized, 'Hai admin, ada newmem di group mu');
            //const media = MessageMedia.fromFilePath('./test/test.pdf');
            //client.sendMessage(participant.id._serialized, media);
        }
    }
    /*console.log('Group Details');
    console.log('Name: ', chat.name);
    console.log('Participants: ', participants);
    console.log('Admins: ', admins);
    notification.reply('User joined.'); // sends message to self*/
});

client.on('group_leave', async (notification) => {
    // User has joined or been added to the group.
    console.log('leave', notification);
    const botno = notification.chatId.split('@')[0];
    let number = await notification.id.remote;
    //client.sendMessage(number, `😭 Selamat tinggal kawan 😭`);

    const chats = await client.getChats();
    for (i in chats) {
        if (number == chats[i].id._serialized) {
            chat = chats[i];
        }
    }
    var participants = {};
    var admins = {};
    var i;
    for (let participant of chat.participants) {
        if (participant.id.user == botno) { continue; }
        //participants.push(participant.id.user);
        const contact = await client.getContactById(participant.id._serialized);
        participants[contact.pushname] = participant.id.user;
        // participant needs to send a message for it to be defined
        if (participant.isAdmin) {
            //admins.push(participant.id.user);
            admins[contact.pushname] = participant.id.user;
            //client.sendMessage(participant.id._serialized, 'Hai admin, ada mem yang keluar di group mu');
  //          const media = MessageMedia.fromFilePath('./test/test.pdf');
            //client.sendMessage(participant.id._serialized, media);
        }
    }
    console.log('Group Details');
    console.log('Name: ', chat.name);
    console.log('Participants: ', participants);
    console.log('Admins: ', admins);
    //notification.reply('User out.'); // sends message to self
});

client.on("group_update", notification => {
	// Group picture, subject or description has been updated.
	console.log("update", notification);
});

client.on("disconnected", reason => {
	console.log("Client was logged out", reason);
});

client.on('change_battery', (batteryInfo) => {
	const { battery, plugged } = batteryInfo;
	console.log(col(time), col("Battery : ","kuning"), col(battery), col("- Charging ?","kuning"), col(plugged))
});

// ======================= WaBot Listen on message

client.on("message", async msg => {
    // console.log('MESSAGE RECEIVED', msg);
    const time = `[ ${tz('Asia/Jakarta').format('LTS')} ]`
    const chat = await msg.getChat();
    const users = await msg.getContact()
    const dariGC = msg['author']
    const dariPC = msg['from']
	console.log(col(time), col("Message:","ijo"),
	msg.from.split('@')[0],
	col("|","ijo"), msg.type, col("|","ijo"),
	msg.body ? msg.body : ""
	)
const botTol = () => {
        msg.reply('[!] Maaf, fitur ini hanya untuk admin(owner).')
        return
    }
const botTol2 = () => {
        msg.reply(`[!] Maaf, fitur ini hanya untuk 'Group Chat'.`)
        return
    }

    if (msg.body.startsWith('%subject ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user || dariGC.replace('@c.us','') == '6285892766102') {
                let title = msg.body.slice(9)
                chat.setSubject(title)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body === '%getall') {
        const chat = await msg.getChat();

        let text = "╭───「 Get All 」\n";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);

            mentions.push(contact);
			text += "├≽ ";
            text += `@${participant.id.user} `;
			text += "\n";
        }
	text += "╰───「 Success 」"
        chat.sendMessage(text, { mentions });
    } else if (msg.body.startsWith('%desk ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user || dariGC.replace('@c.us','') == '6285892766102') {
                let title = msg.body.split("%desk ")[1]
                chat.setDescription(title)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('%promote ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user || dariGC.replace('@c.us','') == '6285892766102') {
                const contact = await msg.getContact();
                const title = msg.mentionedIds[0]
                chat.promoteParticipants([`${title}`])
                //chat.sendMessage(`[:] @${title.replace('@c.us', '')} Ciee... jadi admin ni yee ahay 🤪`)
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('%demote ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user || dariGC.replace('@c.us','') == '6285892766102') {
                let title = msg.mentionedIds[0]
                chat.demoteParticipants([`${title}`])
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('%add ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user || dariGC.replace('@c.us','') == '6285892766102' || dariGC.replace('@c.us','') == '19197694653') {
                let title = msg.body.slice(5)
                if (title.indexOf('62') == -1) {
                    chat.addParticipants([`${title.replace('0', '62')}@c.us`])
                    //msg.reply(`[:] Selamat datang @${title}! jangan lupa baca Deskripsi group yah 😎👊🏻`)
                } else {
                    msg.reply('[:] Format nomor harus 0821xxxxxx')
                }
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body.startsWith('%kick ')) {
        if (chat.isGroup) {
            if (dariGC.replace('@c.us', '') == chat.owner.user || dariGC.replace('@c.us','') == '6285892766102' || dariGC.replace('@c.us','') == '19197694653') {
                let title = msg.mentionedIds
                    chat.removeParticipants([...title])
                // console.log([...title]);
            } else {
                botTol()
            }
        } else {
            botTol2()
        }
    } else if (msg.body == '%owner') {
        if (chat.isGroup) {
            msg.reply(JSON.stringify({
                owner: chat.owner.user
            }))
        } else {
            botTol2()
        }
    }
  } else if (msg.body == "%leave") {
    	// Leave the group
    	let chat = await msg.getChat();
    	if (chat.isGroup) {
      		chat.leave();
    	} else {
      		msg.reply("This command can only be used in a group!");
    	}
}
	} else if (msg.body == '%groupInfo') {
		//let chat = await msg.getChat()
		if (chat.isGroup) {
			msg.reply(`
				*Group Details*
				Name : ${chat.name}
				Description : ${chat.description}
				Created At : ${chat.createdAt.toString()}
				Created By : ${chat.owner.user}
				Participant Count : ${chat.participants.length}
			`)
		} else {
			msg.reply('Perintah ini hanya bisa di pakai di grup!')
		}

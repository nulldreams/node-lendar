const calendar = require('../calendar')

exports.list = (req, reply) => {
  listar(req.query, (err, retorno) => {
    if (err) return reply.code(500).send({err})

    reply.code(200).send({ retorno })
  })
}

function listar (query, cb) {
  calendar.list(query, (err, eventos) => {
    if (err) return cb(err)
    // cb(null, eventos)
    tratarEvento(eventos, (err, retorno) => {
      if (err) return cb(err)

      cb(null, retorno)
    })
  })
}

function tratarEvento (eventos, cb) {
  let retorno = []
  for (const evento of eventos) {
    console.log(evento.summary)
    let sala = ''
    if (evento.location) {
      sala = evento.location
      sala = sala.substring(10, sala.length)
    }
    let automatizar = JSON.stringify(evento).indexOf('#oraculo') > -1

    let reuniao = {
      automatizar: automatizar,
      inicio: evento.start.dateTime,
      fim: evento.end.dateTime,
      nome: evento.summary,
      sala,
      descricao: automatizar ? evento.description.replace('#oraculo\n', '') : evento.description,
      criador: {
        nome: evento.creator.displayName,
        email: evento.creator.email,
        slack: tratarNome(evento.creator.email)
      },
      participantes: []
    }
    for (const participante of evento.attendees) {
      reuniao.participantes.push({
        nome: participante.displayName,
        email: participante.email,
        slack: tratarNome(participante.email)
      })
    }

    retorno.push(reuniao)
  }

  cb(null, retorno)
}

function tratarNome (nome) {
  return nome.replace('@tecnospeed.com.br', '')
}

// const users = {
//   'igor.martins@tecnospeed.com.br': {
//     'id': 'U0HR41P16',
//     'team_id': 'T0HEXERJ6',
//     'name': 'igor.martins',
//     'deleted': false,
//     'color': 'ea2977',
//     'real_name': 'Igor Souza Martins',
//     'tz': 'America/Sao_Paulo',
//     'tz_label': 'Brasilia Summer Time',
//     'tz_offset': -7200,
//     'profile': {
//       'avatar_hash': '386d423b4577',
//       'image_24': 'https://avatars.slack-edge.com/2017-06-07/195116017527_386d423b4577aa438d56_24.jpg',
//       'image_32': 'https://avatars.slack-edge.com/2017-06-07/195116017527_386d423b4577aa438d56_32.jpg',
//       'image_48': 'https://avatars.slack-edge.com/2017-06-07/195116017527_386d423b4577aa438d56_48.jpg',
//       'image_72': 'https://avatars.slack-edge.com/2017-06-07/195116017527_386d423b4577aa438d56_72.jpg',
//       'image_192': 'https://avatars.slack-edge.com/2017-06-07/195116017527_386d423b4577aa438d56_192.jpg',
//       'image_512': 'https://avatars.slack-edge.com/2017-06-07/195116017527_386d423b4577aa438d56_512.jpg',
//       'image_1024': 'https://avatars.slack-edge.com/2017-06-07/195116017527_386d423b4577aa438d56_1024.jpg',
//       'image_original': 'https://avatars.slack-edge.com/2017-06-07/195116017527_386d423b4577aa438d56_original.jpg',
//       'first_name': 'Igor',
//       'last_name': 'Souza Martins',
//       'title': 'Comunica\u00e7\u00e3o (dev/fotos ^^)',
//       'phone': '(44) 8823-8508',
//       'skype': 'implantacao.tecnospeed',
//       'status_emoji': ':github:',
//       'real_name': 'Igor Souza Martins',
//       'display_name': 'igor.martins',
//       'status_text': ':github:',
//       'real_name_normalized': 'Igor Souza Martins',
//       'display_name_normalized': 'igor.martins',
//       'email': 'igor.martins@tecnospeed.com.br',
//       'team': 'T0HEXERJ6'
//     },
//     'is_admin': true,
//     'is_owner': false,
//     'is_primary_owner': false,
//     'is_restricted': false,
//     'is_ultra_restricted': false,
//     'is_bot': false,
//     'updated': 1508515065,
//     'is_app_user': false,
//     'has_2fa': false
//   }
// }

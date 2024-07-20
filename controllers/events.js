import { EventModel } from '../models/events.model.js'

const getEvents = async(req, res) => {

    const events = await EventModel.find().populate('user', 'name')


    res.json({
        ok: true,
        events
    })
}

const createEvent = async(req, res) => {

    const event = new EventModel(req.body) // Se crea el evento
    
    try {
        
        event.user = req.uid // Se agrega el usuario
        const savedEvent = await event.save() // Se almacena el evento

        res.json ({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateEvent = async(req, res) => {
    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await EventModel.findById(eventId)

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await EventModel.findByIdAndUpdate(eventId, newEvent , {new: true})
        res.json({
            ok: true,
            event: updatedEvent
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteEvent = async(req, res) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await EventModel.findById(eventId)

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para eliminar este evento'
            })
        }

        await EventModel.findByIdAndDelete(eventId)
        res.json({ok: true})
            
        


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


export { getEvents, createEvent, updateEvent, deleteEvent }
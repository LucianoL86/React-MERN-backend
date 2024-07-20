import { Router } from 'express'
import { check } from 'express-validator'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import { isDate } from '../helpers/isDate.js'

const router = Router()
router.use(validateJWT)


router.get('/', getEvents)

router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        fieldValidator
    ],
    createEvent
)

router.put('/:id', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        fieldValidator
    ],
    updateEvent
)

router.delete('/:id', deleteEvent)


export default router
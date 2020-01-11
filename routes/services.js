var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var companySchema = new Schema({
    facility: {
        name: String,
        address: String,
        address2: String,
        facilityId: String,
        testingCompany: String
    },
    owner: {
        name: String,
        address: String,
        address2: String,
        phone: String,
        phone2: String
    }
});
var formSchema = new Schema({
    name: String,
    instruction: String,
    sections: [
        {
            title: String,
            measurements: [{ type: Schema.Types.ObjectId, ref: 'Measurement' }]
        }
    ]
});
var measurementSchema = new Schema({
    name: String
});
var serviceSchema = new Schema({
    date: Date,
    comments: String,
    form: { type: Schema.Types.ObjectId, ref: 'Form' },
    locations: [
        [
            {
                measurement: { type: Schema.Types.ObjectId, ref: 'Measurement' },
                value: String
            }
        ]
    ]
});
var Company = mongoose.model('Company', companySchema);
var Form = mongoose.model('Form', formSchema);
var Measurement = mongoose.model('Measurement', measurementSchema);
var Service = mongoose.model('Service', serviceSchema);


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/form', function (req, res, next) {
    Form.findById("5e0268181c9d4400005b3acc")
        .populate({
            path: 'sections.measurements',
            model: Measurement
        })
        .populate('measurements')
        .exec(function (err, form) {
            if (err) return handleError(err);
            res.render('service', { formDetails: form });
        });
    
});

/* GET home page. */
router.get('/insert', function (req, res, next) {
    Form.findOne({ _id: "5e0268181c9d4400005b3acc" }, (err, doc) => {
        doc.instruction = "This data sheet can be used to test mechanical line leak detectors (MLLD) and electronic line leak detectors (ELLD) with submerable turbine pump (STP) systems. See PB/RP1200 Sections 9.1 and 9.2 for test procedures."
        doc.name = "Mechanical and Electronic Line Leak Detectors Performance Test"
        doc.sections[0] = {
            title: "",
            measurements: [
                mongoose.Types.ObjectId("5e036619f0864137e8e5e938"),
                mongoose.Types.ObjectId("5e036619f0864137e8e5e939"),
                mongoose.Types.ObjectId("5e036619f0864137e8e5e93a"),
                mongoose.Types.ObjectId("5e036619f0864137e8e5e93b"),
                mongoose.Types.ObjectId("5e036619f0864137e8e5e93c")
            ]
        }
        doc.sections[1] = {
            title: "MLLD (ALL PRESSURE MEASUREMENTS ARE MADE IN PSIG)",
            measurements: [
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadc3"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadc4"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadc5"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadc6"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadc7"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadc8"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadc9"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadca"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadcb")
            ]
        }
        doc.sections[2] = {
            title: "ELLD (ALL PRESSURE MEASUREMENTS ARE MADE IN PSIG)",
            measurements: [
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadcc"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadcd"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadce"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadcf"),
                mongoose.Types.ObjectId("5e0368d842fcb153b40aadd0")
            ]
        }
        doc.save()
    })
    // var obj = {
    //     "name": "Mechanical and Electronic Line Leak Detectors Performance Test",
    //     "instruction": "asdfkjsladkfjlasdf",
    //     "sections": [{
    //         "title": "MLLD (ALL PRESSURE MEASUREMENTS ARE MADE IN PSIG)",
    //         "measurements": [
    //             { "$oid": "5e027fbd1c9d4400006a1850" },
    //             { "$oid": "5e027fbd1c9d4400006a1851" }
    //         ]
    //     }
    //     ]
    // }



    //     Measurement.insertMany([
    //         // {"name":"Line Number"},
    //         // {"name":"Product Stored"},
    //         // {"name":"Leak Detector Manufacturer"},
    //         // {"name":"Leak Detector Model"},
    //         // {"name":"Type of Leak Detector"}
    //         {"name":"STP Full Operating Pressure "},
    // {"name":"Check Valve Holding Pressure"},
    // {"name":"Line Resiliency (ml) (line bleed back volume as measured from check valve holding pressure to 0 PSIG)"},
    // {"name":"Step Through Time in Seconds (time the MLLD hesitates at metering pressure before going to full operating pressure as measured from 0 psig with no leak induced on the line)"},
    // {"name":"Metering Pressure (STP Pressure when simulated leak rate 3gph at 10 psig)"},
    // {"name":"Opening Time in Seconds (the time the MLLD opens to allow full pressure after simulated leak is stopped)"},
    // {"name":"Does the STP pressure remain at or below the metering pressure for atleast 60 seconds when the simulated leak is induced?"},
    // {"name":"Does the leak detector reset (trip) when the line pressure is bled off to zero psig?"},
    // {"name":"Does the STP properly cycle on/off under normal fuel system operation conditions?"},
    // {"name":"STP full operating Pressure"},
    // {"name":"How many test cycles are observed before alarm/shutdown occurs?"},
    // {"name":"Does the stimulated leak cause an alarm?"},
    // {"name":"A \"No\" answer to either above question indicates the ELLD fails the test."},
    // {"name":"Does the stimulated leak cause an STP Shutdown?"}
    //     ],(errr,docs)=>{
    //         console.log(errr);
    //     })
    res.render('service', { title: 'Express' });
});

module.exports = router;

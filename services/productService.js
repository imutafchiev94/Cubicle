const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');


async function getAll(data) {

    let searched = await Cube.find({}).lean();

    if(data.search) {
        searched = searched.filter(x => x.name.toLowerCase().includes(data.search));
    }
    if(data.from) {
       searched = searched.filter(x => x.level >= parseInt(data.from));
    }
    if(data.to) {
       searched = searched.filter(x => x.level <= parseInt(data.to));
    }

    return searched;
}

function getOne(id) {
    return Cube.findById(id).lean();
}

function create(data) {
    let cube = new Cube(data)

    return cube.save();
}

function getOneWithAccessories(id) {
    return Cube.findById(id)
    .populate('accessories')
    .lean();
}

async function attachAccessory(cubeId, accessoryId) {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    return cube.save();
}
   


module.exports = {
    getAll,
    create,
    getOne,
    attachAccessory,
    getOneWithAccessories
}
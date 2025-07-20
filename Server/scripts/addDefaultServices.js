const mongoose = require('mongoose');
const Service = require('../models/Service');
require('dotenv').config();

const defaultServices = [
  { name: 'Deep Cleaning', description: 'Comprehensive deep cleaning service' },
  { name: 'Carpet Cleaning', description: 'Professional carpet cleaning service' },
  { name: 'Window Cleaning', description: 'Interior and exterior window cleaning' },
  { name: 'Office Cleaning', description: 'Commercial office cleaning service' },
  { name: 'Home Cleaning', description: 'Regular home cleaning service' }
];

const addDefaultServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    for (const serviceData of defaultServices) {
      const existingService = await Service.findOne({ name: serviceData.name });
      if (!existingService) {
        const service = new Service(serviceData);
        await service.save();
        console.log(`Added service: ${serviceData.name}`);
      } else {
        console.log(`Service already exists: ${serviceData.name}`);
      }
    }

    console.log('Default services setup completed');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up default services:', error);
    process.exit(1);
  }
};

addDefaultServices();

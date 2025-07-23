import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faPhoneAlt, 
  faEnvelope, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export const FooterExtended: React.FC = () => (
  <div className='w-full bg-white border-t border-gray-200 py-10 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-start gap-8'>
    <div className='flex-1 min-w-[180px]'>
      <div className='text-blue-700 font-bold text-lg mb-2'>Hogar360</div>
      <div className='text-gray-600 text-sm'>Tu partner en la búsqueda del espacio perfecto.</div>
    </div>
    <div className='flex-1 min-w-[180px]'>
      <div className='font-semibold text-gray-800 mb-2'>Acceso rápido</div>
      <ul className='text-gray-700 text-sm space-y-1'>
        <li><a href='#' className='hover:underline'>Buscar Propiedades</a></li>
        <li><a href='#' className='hover:underline'>Publica tu propiedad</a></li>
        <li><a href='#' className='hover:underline'>Property Management</a></li>
      </ul>
    </div>
    <div className='flex-1 min-w-[180px]'>
      <div className='font-semibold text-gray-800 mb-2'>Contactanos</div>
      <ul className='text-gray-700 text-sm space-y-1'>
        <li className='flex items-center gap-2'><FontAwesomeIcon icon={faPhoneAlt as IconProp} className='text-blue-700' /> 1-800-HOGAR360</li>
        <li className='flex items-center gap-2'><FontAwesomeIcon icon={faEnvelope as IconProp} className='text-blue-700' /> info@hogar360.com</li>
        <li className='flex items-center gap-2'><FontAwesomeIcon icon={faMapMarkerAlt as IconProp} className='text-blue-700' /> 123 Real Estate Ave</li>
      </ul>
    </div>
    <div className='flex-1 min-w-[180px]'>
      <div className='font-semibold text-gray-800 mb-2'>Síguenos</div>
      <div className='flex gap-3 mt-1'>
        <a href='#' className='text-gray-500 hover:text-blue-700'><FontAwesomeIcon icon={faFacebookF as IconProp} size='lg' /></a>
        <a href='#' className='text-gray-500 hover:text-blue-700'><FontAwesomeIcon icon={faTwitter as IconProp} size='lg' /></a>
        <a href='#' className='text-gray-500 hover:text-blue-700'><FontAwesomeIcon icon={faInstagram as IconProp} size='lg' /></a>
        <a href='#' className='text-gray-500 hover:text-blue-700'><FontAwesomeIcon icon={faLinkedinIn as IconProp} size='lg' /></a>
      </div>
    </div>
  </div>
)

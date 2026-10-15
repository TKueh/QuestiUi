import React from 'react';
import '../index.js';
import cover from './Cover.html?raw';

export default { title: 'App / Titelblatt' };

export const Vorschau = () => <div dangerouslySetInnerHTML={{ __html: cover }} />;

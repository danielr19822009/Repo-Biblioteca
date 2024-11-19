
create database IF NOT EXISTS bd_librarysm;

use bd_librarysm;
-- ---------------------credenciales para bd aws mysql---biblioteca138--------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `autorId` int(11) NOT NULL,
  `nombreAutor` varchar(50) NOT NULL,
  `apellidoAutor` varchar(50) NOT NULL
) ;

--
-- Volcado de datos para la tabla `autor`
--

INSERT INTO `autor` (`autorId`, `nombreAutor`, `apellidoAutor`) VALUES
(1, 'Gabriel  G', 'Marquez'),
(2, 'J.K.', 'Rowling'),
(3, 'George', 'Orwell '),
(4, 'Jane', 'Austen'),
(5, 'Haruki', 'Murakami'),
(6, 'Juan', 'siniestrottt'),
(12, 'Anil ', 'Maheshwari'),
(14, 'Migfuel', 'Cervantes Muelon'),
(15, 'Daniel', 'Londono'),
(16, 'Daniels', 'Lond'),
(17, 'Pedro', 'Garces'),
(18, 'Daniel pitufo', 'perez'),
(21, 'christian', 'Roldan R'),
(22, 'Daniel', 'nieto'),
(23, 'daniel', 'Haruki'),
(24, 'J.K.', 'Kennedy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editorial`
--

CREATE TABLE `editorial` (
  `editorialId` int(11) NOT NULL,
  `nombreEditorial` varchar(50) NOT NULL,
  `direccionEditorial` varchar(100) DEFAULT NULL,
  `telefonoEditorial` varchar(100) DEFAULT NULL
);

--
-- Volcado de datos para la tabla `editorial`
--

INSERT INTO `editorial` (`editorialId`, `nombreEditorial`, `direccionEditorial`, `telefonoEditorial`) VALUES
(1, 'Editorial Planeta', 'Calle Ejemplo, 123, Madrid, España', '123 456 789'),
(2, 'Penguin Random House', 'Avenida de la Libertad, 456, Barcelona, España', '+34 987 654 321'),
(3, 'Harper Collins', 'Calle Falsa, 789, Sevilla, España colombia', '666666666'),
(4, 'Ediciones Anagrama', 'Paseo de Gracia, 101, Valencia, España', '+34 321 654 987'),
(5, 'RBA Libros', 'Gran Vía, 22, Bilbao, España', '+34 432 567 890'),
(36, 'Art if Statics ', 'Avenida Sprinfiel', '34 5454545'),
(38, 'Los Machos SAS', 'Avenida Sprinfielllll', '4535353'),
(39, 'Tricentenario', 'Avenida Sprinfiel', '4535353'),
(41, 'Daniel SAS', 'Avenida Sprinfielllll', '4535353'),
(42, 'HarperColombia', 'Avenida del rio Colombia', '22222226666');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `libroId` int(11) NOT NULL,
  `nombreLibro` varchar(50) NOT NULL,
  `editorialId` int(11) DEFAULT NULL,
  `autorId` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `fechaCreacion` date NOT NULL
);

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`libroId`, `nombreLibro`, `editorialId`, `autorId`, `cantidad`, `fechaCreacion`) VALUES
(1, 'Cien años de soledad', 1, 1, 5, '2024-09-01'),
(2, 'Harry Potter y la piedra filosofal', 2, 2, 15, '1997-06-26'),
(3, '1984', 3, 3, 10, '2024-09-01'),
(4, 'Orgullo y prejuicio', 4, 4, 5, '1813-01-28'),
(5, 'Kafka en la orilla', 5, 5, 12, '2002-09-12'),
(12, 'Data Analytics Made Accessible', 36, 12, 10, '2024-08-28'),
(15, 'los pitufos Parte 2', 38, 17, 4, '2024-08-06'),
(16, 'Los Milanos', 5, 3, 2, '2024-08-30'),
(17, 'los pitufos 3', 3, 18, 1, '2024-08-30'),
(18, 'Las promesas De Dios', 3, 15, 10, '2024-07-05'),
(20, 'los pitufos 4.5', 2, 23, 5, '2024-09-08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `prestamoId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `libroId` int(11) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaFin` datetime NOT NULL
) ;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`prestamoId`, `usuarioId`, `libroId`, `estado`, `fechaCreacion`, `fechaFin`) VALUES
(1, 1, 1, 'Activo', '2024-08-23 00:00:00', '2024-12-31 00:00:00'),
(2, 2, 2, 'Devuelto', '2024-06-01 00:00:00', '2024-07-15 00:00:00'),
(3, 3, 3, 'Activo', '2024-08-20 00:00:00', '2024-09-10 00:00:00'),
(4, 4, 4, 'Retrasado', '2024-09-08 00:00:00', '2024-09-14 00:00:00'),
(5, 5, 5, 'Devuelto', '2024-07-20 00:00:00', '2024-08-10 00:00:00'),
(6, 5, 15, 'Activo', '2024-09-29 00:00:00', '2024-08-22 00:00:00'),
(7, 10, 15, 'Activo', '2024-09-24 00:00:00', '2024-08-22 00:00:00'),
(8, 4, 3, 'Activo', '2024-09-13 00:00:00', '2024-09-01 00:00:00'),
(9, 9, 3, 'Activo', '2024-08-30 00:00:00', '2024-09-18 00:00:00'),
(10, 1, 1, 'Excelente', '2024-08-31 00:00:00', '2024-09-30 00:00:00'),
(11, 18, 17, 'Activo', '2024-09-07 00:00:00', '2024-08-31 00:00:00'),
(12, 19, 18, 'Muy Bueno', '2024-10-31 00:00:00', '2024-09-01 00:00:00'),
(13, 20, 2, 'Malo', '2024-09-30 00:00:00', '2024-09-01 00:00:00'),
(14, 6, 2, 'Muy Bueno', '2024-09-01 00:00:00', '2024-09-01 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `usuarioId` int(11) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`usuarioId`, `cedula`, `nombre`, `direccion`, `telefono`) VALUES
(1, '123456789', 'Milena', 'Cra 53 #76-23', '30023545'),
(2, '123506', 'yulia', 'CALLE 87   # 42   27 ', '444444444'),
(3, '12350678', 'viviana', 'carrera 44a 97', '536506767'),
(4, '7685634', 'miguel r', 'call 50 aaaa', '88888888888'),
(5, '12312345', 'Daniela V', 'carrera 44a 93 b', '08000919595'),
(6, '123506', 'yulian Rodriguez', 'CALLE 87   # 42   27 ', '3004232258555'),
(9, '7125050678', 'Daniel', 'carrera 44a 93', '505050504'),
(10, '1017156432', 'kenneth rodriguez', 'carrera 44a 93', '3004232258'),
(13, '123456', 'Pedro Miguel', 'carrera 44a 93', '+34 123 456 789'),
(14, '1234567', 'Anil ', 'calle45', '3004232258'),
(15, '1111', 'Flamenco', 'carrera 44a 93', '3116673207'),
(16, '1234567', 'Jane', 'Calle Falsa, 789, Sevilla, España', '123'),
(17, '1234567', 'Flamenco', 'carrera 44a 93', '+34 123 456 789'),
(18, '12345678910', 'Kenneth Andres Rodriguez M', 'carrea 39 n 68', '310 3896754'),
(19, '999999', 'Jesus Mio', 'Avenda gods', '999999'),
(20, '71.265.045', 'daniel Montoya', 'calle45', '3116673207');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersAdmon`
--

CREATE TABLE `usersAdmon` (
  `userAdmonId` int(11) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL
) ;

--
-- Volcado de datos para la tabla `usersAdmon`
--

INSERT INTO `usersAdmon` (`userAdmonId`, `nombreUsuario`, `correo`, `contrasena`) VALUES
(1, 'daniel', 'test@test', 'test123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`autorId`);

--
-- Indices de la tabla `editorial`
--
ALTER TABLE `editorial`
  ADD PRIMARY KEY (`editorialId`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`libroId`),
  ADD KEY `editorialId` (`editorialId`),
  ADD KEY `autorId` (`autorId`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`prestamoId`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `libroId` (`libroId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`usuarioId`);

--
-- Indices de la tabla `usersAdmon`
--
ALTER TABLE `usersAdmon`
  ADD PRIMARY KEY (`userAdmonId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `autorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `editorial`
--
ALTER TABLE `editorial`
  MODIFY `editorialId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `libroId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `prestamoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `usuarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usersAdmon`
--
ALTER TABLE `usersAdmon`
  MODIFY `userAdmonId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`editorialId`) REFERENCES `editorial` (`editorialId`),
  ADD CONSTRAINT `libro_ibfk_2` FOREIGN KEY (`autorId`) REFERENCES `autor` (`autorId`);
s
--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `users` (`usuarioId`),
  ADD CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`libroId`) REFERENCES `libro` (`libroId`);
COMMIT;



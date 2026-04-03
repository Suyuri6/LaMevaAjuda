-- ============================================
-- SEED DATA: Real Spanish & Catalan government aids
-- ============================================

-- 1. Ingreso Mínimo Vital (IMV)
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000001', 'ingreso-minimo-vital', 'estado', 'income',
  '{"ca": "Des de 604€/mes (adult sol)", "es": "Desde 604€/mes (adulto solo)", "en": "From €604/month (single adult)"}',
  '{"ca": "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8d06-4645-bde7-05374ee42ac7", "es": "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8d06-4645-bde7-05374ee42ac7", "en": "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8d06-4645-bde7-05374ee42ac7"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000001', 'ca', 'Ingrés Mínim Vital',
  'Prestació de la Seguretat Social per a llars amb ingressos baixos.',
  'L''Ingrés Mínim Vital (IMV) és una prestació no contributiva de la Seguretat Social que garanteix un nivell mínim de renda a les llars en situació de vulnerabilitat econòmica.',
  'Edat entre 23 i 65 anys, ingressos anuals inferiors a 7.120€ (adult sol), residència legal a Espanya mínim 1 any.'),
('a0000000-0000-0000-0000-000000000001', 'es', 'Ingreso Mínimo Vital',
  'Prestación de la Seguridad Social para hogares con ingresos bajos.',
  'El Ingreso Mínimo Vital (IMV) es una prestación no contributiva de la Seguridad Social que garantiza un nivel mínimo de renta a los hogares en situación de vulnerabilidad económica.',
  'Edad entre 23 y 65 años, ingresos anuales inferiores a 7.120€ (adulto solo), residencia legal en España mínimo 1 año.'),
('a0000000-0000-0000-0000-000000000001', 'en', 'Minimum Living Income',
  'Social Security benefit for low-income households.',
  'The Minimum Living Income (IMV) is a non-contributory Social Security benefit that guarantees a minimum income level for households in economic vulnerability.',
  'Age between 23 and 65, annual income below €7,120 (single adult), legal residence in Spain for at least 1 year.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000001', 'age', 'gte', '23', 0),
('a0000000-0000-0000-0000-000000000001', 'age', 'lte', '65', 0),
('a0000000-0000-0000-0000-000000000001', 'annualIncome', 'lte', '7120', 0),
('a0000000-0000-0000-0000-000000000001', 'immigrationStatus', 'in', '["citizen","eu_national","permanent_resident","temporary_resident","refugee"]', 0),
-- Rule group 1: single parent path
('a0000000-0000-0000-0000-000000000001', 'age', 'gte', '18', 1),
('a0000000-0000-0000-0000-000000000001', 'familySituation', 'eq', '"single_parent"', 1),
('a0000000-0000-0000-0000-000000000001', 'annualIncome', 'lte', '14000', 1),
('a0000000-0000-0000-0000-000000000001', 'immigrationStatus', 'in', '["citizen","eu_national","permanent_resident","temporary_resident","refugee"]', 1);

-- 2. Renda Garantida de Ciutadania (RGC)
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000002', 'renda-garantida-ciutadania', 'generalitat', 'income',
  '{"ca": "Des de 664€/mes", "es": "Desde 664€/mes", "en": "From €664/month"}',
  '{"ca": "https://web.gencat.cat/ca/tramits/tramits-temes/Renda-garantida-de-ciutadania", "es": "https://web.gencat.cat/ca/tramits/tramits-temes/Renda-garantida-de-ciutadania", "en": "https://web.gencat.cat/ca/tramits/tramits-temes/Renda-garantida-de-ciutadania"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000002', 'ca', 'Renda Garantida de Ciutadania',
  'Prestació social per garantir els mínims d''una vida digna a Catalunya.',
  'La Renda Garantida de Ciutadania (RGC) és una prestació econòmica periòdica adreçada a les persones que no disposen de recursos econòmics suficients per atendre les necessitats bàsiques de la vida quotidiana.',
  'Residència a Catalunya mínim 2 anys, ingressos inferiors al llindar establert, edat entre 23 i 65 anys.'),
('a0000000-0000-0000-0000-000000000002', 'es', 'Renta Garantizada de Ciudadanía',
  'Prestación social para garantizar los mínimos de una vida digna en Cataluña.',
  'La Renta Garantizada de Ciudadanía (RGC) es una prestación económica periódica dirigida a personas que no disponen de recursos económicos suficientes para atender las necesidades básicas de la vida cotidiana.',
  'Residencia en Cataluña mínimo 2 años, ingresos inferiores al umbral establecido, edad entre 23 y 65 años.'),
('a0000000-0000-0000-0000-000000000002', 'en', 'Guaranteed Citizenship Income',
  'Social benefit to guarantee minimum living standards in Catalonia.',
  'The Guaranteed Citizenship Income (RGC) is a periodic economic benefit for people who lack sufficient economic resources to meet basic daily needs.',
  'Residence in Catalonia for at least 2 years, income below established threshold, age between 23 and 65.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000002', 'age', 'gte', '23', 0),
('a0000000-0000-0000-0000-000000000002', 'age', 'lte', '65', 0),
('a0000000-0000-0000-0000-000000000002', 'residesInCatalonia', 'eq', 'true', 0),
('a0000000-0000-0000-0000-000000000002', 'annualIncome', 'lte', '8000', 0),
('a0000000-0000-0000-0000-000000000002', 'immigrationStatus', 'in', '["citizen","eu_national","permanent_resident","temporary_resident","refugee"]', 0);

-- 3. Bo Lloguer Jove
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000003', 'bo-lloguer-jove', 'estado', 'housing',
  '{"ca": "250€/mes durant 2 anys", "es": "250€/mes durante 2 años", "en": "€250/month for 2 years"}',
  '{"ca": "https://www.mitma.gob.es/vivienda/bono-alquiler-joven", "es": "https://www.mitma.gob.es/vivienda/bono-alquiler-joven", "en": "https://www.mitma.gob.es/vivienda/bono-alquiler-joven"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000003', 'ca', 'Bo Lloguer Jove',
  'Ajuda de 250€/mes per a joves llogaters de fins a 35 anys.',
  'El Bo Lloguer Jove és una ajuda directa al lloguer per a joves de fins a 35 anys amb ingressos limitats.',
  'Edat fins a 35 anys, llogater/a, ingressos anuals fins a 3 vegades l''IPREM (aprox. 24.318€).'),
('a0000000-0000-0000-0000-000000000003', 'es', 'Bono Alquiler Joven',
  'Ayuda de 250€/mes para jóvenes inquilinos de hasta 35 años.',
  'El Bono Alquiler Joven es una ayuda directa al alquiler para jóvenes de hasta 35 años con ingresos limitados.',
  'Edad hasta 35 años, inquilino/a, ingresos anuales hasta 3 veces el IPREM (aprox. 24.318€).'),
('a0000000-0000-0000-0000-000000000003', 'en', 'Young Renter Bonus',
  '€250/month housing aid for renters up to 35 years old.',
  'The Young Renter Bonus is a direct rental aid for young people up to 35 years old with limited income.',
  'Age up to 35, renter, annual income up to 3 times IPREM (approx. €24,318).');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000003', 'age', 'lte', '35', 0),
('a0000000-0000-0000-0000-000000000003', 'age', 'gte', '18', 0),
('a0000000-0000-0000-0000-000000000003', 'housingSituation', 'eq', '"renter"', 0),
('a0000000-0000-0000-0000-000000000003', 'annualIncome', 'lte', '24318', 0);

-- 4. Prestació per desocupació
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000004', 'prestacio-desocupacio', 'estado', 'employment',
  '{"ca": "70% base reguladora (6 primers mesos)", "es": "70% base reguladora (6 primeros meses)", "en": "70% regulatory base (first 6 months)"}',
  '{"ca": "https://www.sepe.es/HomeSepe/prestaciones/prestacion-contributiva.html", "es": "https://www.sepe.es/HomeSepe/prestaciones/prestacion-contributiva.html", "en": "https://www.sepe.es/HomeSepe/prestaciones/prestacion-contributiva.html"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000004', 'ca', 'Prestació per desocupació',
  'Prestació contributiva per a treballadors en situació d''atur amb cotitzacions suficients.',
  'La prestació per desocupació és un ajut econòmic per als treballadors que han perdut la feina de manera involuntària i tenen cotitzades un mínim de 360 dies.',
  'Situació d''atur, haver cotitzat mínim 360 dies en els últims 6 anys.'),
('a0000000-0000-0000-0000-000000000004', 'es', 'Prestación por desempleo',
  'Prestación contributiva para trabajadores en situación de desempleo con cotizaciones suficientes.',
  'La prestación por desempleo es una ayuda económica para trabajadores que han perdido su empleo de manera involuntaria y tienen cotizados un mínimo de 360 días.',
  'Situación de desempleo, haber cotizado mínimo 360 días en los últimos 6 años.'),
('a0000000-0000-0000-0000-000000000004', 'en', 'Unemployment benefit',
  'Contributory benefit for unemployed workers with sufficient contributions.',
  'The unemployment benefit is financial aid for workers who have involuntarily lost their job and have contributed at least 360 days.',
  'Unemployed status, at least 360 days of contributions in the last 6 years.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000004', 'employmentStatus', 'eq', '"unemployed"', 0),
('a0000000-0000-0000-0000-000000000004', 'immigrationStatus', 'in', '["citizen","eu_national","permanent_resident","temporary_resident","refugee"]', 0);

-- 5. Ajuts al lloguer (Generalitat)
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000005', 'ajuts-lloguer-generalitat', 'generalitat', 'housing',
  '{"ca": "Fins a 200€/mes", "es": "Hasta 200€/mes", "en": "Up to €200/month"}',
  '{"ca": "https://habitatge.gencat.cat/ca/ambits/ajuts/lloguer/", "es": "https://habitatge.gencat.cat/ca/ambits/ajuts/lloguer/", "en": "https://habitatge.gencat.cat/ca/ambits/ajuts/lloguer/"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000005', 'ca', 'Ajuts al lloguer de la Generalitat',
  'Subvenció per al pagament del lloguer d''habitatge habitual a Catalunya.',
  'Ajuts econòmics per facilitar l''accés i el manteniment de l''habitatge de lloguer a persones amb ingressos baixos residents a Catalunya.',
  'Resident a Catalunya, llogater/a, ingressos inferiors a 2,83 vegades l''IRSC, lloguer dins els límits establerts.'),
('a0000000-0000-0000-0000-000000000005', 'es', 'Ayudas al alquiler de la Generalitat',
  'Subvención para el pago del alquiler de vivienda habitual en Cataluña.',
  'Ayudas económicas para facilitar el acceso y mantenimiento de la vivienda de alquiler a personas con ingresos bajos residentes en Cataluña.',
  'Residente en Cataluña, inquilino/a, ingresos inferiores a 2,83 veces el IRSC, alquiler dentro de los límites establecidos.'),
('a0000000-0000-0000-0000-000000000005', 'en', 'Generalitat rental aid',
  'Subsidy for regular housing rental payments in Catalonia.',
  'Financial aid to facilitate access to and maintenance of rental housing for low-income residents in Catalonia.',
  'Resident in Catalonia, renter, income below 2.83 times the IRSC, rent within established limits.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000005', 'residesInCatalonia', 'eq', 'true', 0),
('a0000000-0000-0000-0000-000000000005', 'housingSituation', 'eq', '"renter"', 0),
('a0000000-0000-0000-0000-000000000005', 'annualIncome', 'lte', '25000', 0);

-- 6. Prestació per fill a càrrec
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000006', 'prestacio-fill-carrec', 'estado', 'family',
  '{"ca": "Fins a 1.000€/any per fill", "es": "Hasta 1.000€/año por hijo", "en": "Up to €1,000/year per child"}',
  '{"ca": "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10967", "es": "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10967", "en": "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10967"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000006', 'ca', 'Prestació per fill o menor a càrrec',
  'Ajuda econòmica per a famílies amb fills menors o persones amb discapacitat a càrrec.',
  'Prestació econòmica destinada a cobrir la situació de necessitat econòmica o d''excessos de despeses que suposa tenir fills o menors a càrrec.',
  'Tenir fills menors o persones amb discapacitat a càrrec, ingressos limitats.'),
('a0000000-0000-0000-0000-000000000006', 'es', 'Prestación por hijo o menor a cargo',
  'Ayuda económica para familias con hijos menores o personas con discapacidad a cargo.',
  'Prestación económica destinada a cubrir la situación de necesidad económica que supone tener hijos o menores a cargo.',
  'Tener hijos menores o personas con discapacidad a cargo, ingresos limitados.'),
('a0000000-0000-0000-0000-000000000006', 'en', 'Child benefit',
  'Financial aid for families with dependent children or disabled dependents.',
  'Economic benefit to cover the financial needs of having dependent children or minors.',
  'Having dependent children or disabled dependents, limited income.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000006', 'numberOfDependents', 'gte', '1', 0),
('a0000000-0000-0000-0000-000000000006', 'annualIncome', 'lte', '14000', 0),
('a0000000-0000-0000-0000-000000000006', 'immigrationStatus', 'in', '["citizen","eu_national","permanent_resident","temporary_resident","refugee"]', 0);

-- 7. Llei de Dependència
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000007', 'llei-dependencia', 'estado', 'dependency',
  '{"ca": "Variable segons grau de dependència", "es": "Variable según grado de dependencia", "en": "Variable depending on dependency level"}',
  '{"ca": "https://www.imserso.es/dependencia/home", "es": "https://www.imserso.es/dependencia/home", "en": "https://www.imserso.es/dependencia/home"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000007', 'ca', 'Prestacions de la Llei de Dependència',
  'Ajudes per a persones en situació de dependència reconeguda.',
  'La Llei de Dependència ofereix un conjunt de prestacions i serveis per a persones que necessiten ajuda per a les activitats bàsiques de la vida diària.',
  'Tenir reconegut un grau de dependència o discapacitat significativa.'),
('a0000000-0000-0000-0000-000000000007', 'es', 'Prestaciones de la Ley de Dependencia',
  'Ayudas para personas en situación de dependencia reconocida.',
  'La Ley de Dependencia ofrece un conjunto de prestaciones y servicios para personas que necesitan ayuda para las actividades básicas de la vida diaria.',
  'Tener reconocido un grado de dependencia o discapacidad significativa.'),
('a0000000-0000-0000-0000-000000000007', 'en', 'Dependency Law benefits',
  'Aid for people with recognised dependency status.',
  'The Dependency Law provides benefits and services for people who need help with basic daily activities.',
  'Having a recognised dependency level or significant disability.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000007', 'disabilityPercentage', 'gte', '33', 0);

-- 8. Ajuts per a persones amb discapacitat (Generalitat)
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000008', 'ajuts-discapacitat-generalitat', 'generalitat', 'disability',
  '{"ca": "Variable segons necessitat", "es": "Variable según necesidad", "en": "Variable depending on needs"}',
  '{"ca": "https://treballiaferssocials.gencat.cat/ca/ambits_tematics/persones_amb_discapacitat/", "es": "https://treballiaferssocials.gencat.cat/ca/ambits_tematics/persones_amb_discapacitat/", "en": "https://treballiaferssocials.gencat.cat/ca/ambits_tematics/persones_amb_discapacitat/"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000008', 'ca', 'Ajuts per a persones amb discapacitat',
  'Conjunt d''ajudes de la Generalitat per a persones amb discapacitat reconeguda a Catalunya.',
  'Programes d''ajut econòmic i de serveis per a persones amb discapacitat reconeguda residents a Catalunya, incloent ajudes tècniques, adaptació d''habitatge i suport personal.',
  'Discapacitat reconeguda igual o superior al 33%, residència a Catalunya.'),
('a0000000-0000-0000-0000-000000000008', 'es', 'Ayudas para personas con discapacidad',
  'Conjunto de ayudas de la Generalitat para personas con discapacidad reconocida en Cataluña.',
  'Programas de ayuda económica y servicios para personas con discapacidad reconocida residentes en Cataluña, incluyendo ayudas técnicas, adaptación de vivienda y apoyo personal.',
  'Discapacidad reconocida igual o superior al 33%, residencia en Cataluña.'),
('a0000000-0000-0000-0000-000000000008', 'en', 'Disability aid (Generalitat)',
  'Generalitat aid programmes for people with recognised disabilities in Catalonia.',
  'Economic aid programmes and services for people with recognised disabilities living in Catalonia, including technical aids, home adaptation, and personal support.',
  'Recognised disability of 33% or more, residence in Catalonia.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000008', 'disabilityPercentage', 'gte', '33', 0),
('a0000000-0000-0000-0000-000000000008', 'residesInCatalonia', 'eq', 'true', 0);

-- 9. Beca general universitària (MEC)
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000009', 'beca-general-universitaria', 'estado', 'education',
  '{"ca": "Variable: matrícula + fins a 6.000€/any", "es": "Variable: matrícula + hasta 6.000€/año", "en": "Variable: tuition + up to €6,000/year"}',
  '{"ca": "https://www.becaseducacion.gob.es/", "es": "https://www.becaseducacion.gob.es/", "en": "https://www.becaseducacion.gob.es/"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000009', 'ca', 'Beca general universitària',
  'Beca del Ministeri d''Educació per a estudiants universitaris amb rendes baixes.',
  'Beca de caràcter general per a estudiants que cursen estudis universitaris, amb components de matrícula, residència, renda i excel·lència acadèmica.',
  'Estudiant universitari, ingressos familiars segons llindars establerts, rendiment acadèmic mínim.'),
('a0000000-0000-0000-0000-000000000009', 'es', 'Beca general universitaria',
  'Beca del Ministerio de Educación para estudiantes universitarios con rentas bajas.',
  'Beca de carácter general para estudiantes que cursen estudios universitarios, con componentes de matrícula, residencia, renta y excelencia académica.',
  'Estudiante universitario, ingresos familiares según umbrales establecidos, rendimiento académico mínimo.'),
('a0000000-0000-0000-0000-000000000009', 'en', 'General university scholarship',
  'Ministry of Education scholarship for university students with low income.',
  'General scholarship for university students, including tuition, residence, income, and academic excellence components.',
  'University student, family income within established thresholds, minimum academic performance.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000009', 'employmentStatus', 'eq', '"student"', 0),
('a0000000-0000-0000-0000-000000000009', 'annualIncome', 'lte', '36000', 0);

-- 10. Renda Activa d'Inserció (RAI)
INSERT INTO aids (id, slug, government, category, amount_text, official_url) VALUES
('a0000000-0000-0000-0000-000000000010', 'renda-activa-insercio', 'estado', 'employment',
  '{"ca": "480€/mes durant 11 mesos", "es": "480€/mes durante 11 meses", "en": "€480/month for 11 months"}',
  '{"ca": "https://www.sepe.es/HomeSepe/prestaciones/renta-activa-insercion.html", "es": "https://www.sepe.es/HomeSepe/prestaciones/renta-activa-insercion.html", "en": "https://www.sepe.es/HomeSepe/prestaciones/renta-activa-insercion.html"}');

INSERT INTO aid_translations (aid_id, locale, name, short_desc, description, eligibility_summary) VALUES
('a0000000-0000-0000-0000-000000000010', 'ca', 'Renda Activa d''Inserció (RAI)',
  'Ajuda per a desocupats de llarga durada, víctimes de violència de gènere i persones amb discapacitat.',
  'La RAI és un programa d''ajuda per a persones en situació de necessitat econòmica i dificultat especial per trobar feina, amb compromís actiu de cerca d''ocupació.',
  'En atur, sense dret a prestació per desocupació, ingressos inferiors al 75% del SMI.'),
('a0000000-0000-0000-0000-000000000010', 'es', 'Renta Activa de Inserción (RAI)',
  'Ayuda para desempleados de larga duración, víctimas de violencia de género y personas con discapacidad.',
  'La RAI es un programa de ayuda para personas en situación de necesidad económica y especial dificultad para encontrar empleo, con compromiso activo de búsqueda de empleo.',
  'En paro, sin derecho a prestación por desempleo, ingresos inferiores al 75% del SMI.'),
('a0000000-0000-0000-0000-000000000010', 'en', 'Active Insertion Income (RAI)',
  'Aid for long-term unemployed, gender violence victims, and disabled people.',
  'The RAI is an aid programme for people in economic need with special difficulty finding employment, requiring active job-seeking commitment.',
  'Unemployed, not entitled to unemployment benefit, income below 75% of minimum wage.');

INSERT INTO eligibility_rules (aid_id, field, operator, value, rule_group) VALUES
('a0000000-0000-0000-0000-000000000010', 'employmentStatus', 'eq', '"unemployed"', 0),
('a0000000-0000-0000-0000-000000000010', 'annualIncome', 'lte', '9000', 0),
('a0000000-0000-0000-0000-000000000010', 'immigrationStatus', 'in', '["citizen","eu_national","permanent_resident","temporary_resident","refugee"]', 0);

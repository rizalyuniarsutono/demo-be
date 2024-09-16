CREATE DATABASE si_pengecekan_calon_peserta;
CREATE TABLE alumni_diklat(
    id VARCHAR(255) PRIMARY key,
    id_diklat VARCHAR,
    nama_diklat VARCHAR,
    nama_peserta VARCHAR,
    nip VARCHAR,
    no_urut VARCHAR,
    penyelenggara VARCHAR,
    pelaksana_diklat VARCHAR,
    lama_diklat VARCHAR,
    nomor_sertifikat VARCHAR,
    tanggal_sertifikat VARCHAR,
    pejabat_sertifikat VARCHAR,
    tanggal_mulai VARCHAR,
    tanggal_akhir VARCHAR,
    peringkat VARCHAR,
    angkatan VARCHAR,
    kelulusan VARCHAR,
    total_peserta VARCHAR
);
insert into alumni_diklat(id,id_diklat,nama_diklat,nama_peserta,nip,no_urut,penyelenggara,pelaksana_diklat,lama_diklat,nomor_sertifikat,tanggal_sertifikat,pejabat_sertifikat,tanggal_mulai,tanggal_akhir,peringkat,angkatan,kelulusan,total_peserta)
values('1', '111', 'Nama Diklat 1', 'Rizal', '123456', '11', 'Penyelenggara A', 'Pelaksana Diklat 1', '1 hari', '11223344', '20 Juli 2024', 'Pejabat Rizal', '1 Juli 2024', '30 Juli 2024', '1', '1', 'Lulus', '10'),
('2', '222', 'Nama Diklat 2', 'Rizal 2', '1234567', '22', 'Penyelenggara B', 'Pelaksana Diklat 2', '2 hari', '1122334455', '20 Juli 2024', 'Pejabat Rizal', '1 Juli 2024', '30 Juli 2024', '1', '1', 'Lulus', '10');
INSERT INTO alumni_diklat (id, id_diklat, nama_diklat, nama_peserta, nip, no_urut, penyelenggara, pelaksana_diklat, lama_diklat, nomor_sertifikat, tanggal_sertifikat, pejabat_sertifikat, tanggal_mulai, tanggal_akhir, peringkat, angkatan, kelulusan, total_peserta
) VALUES
-- Data 1: Data ini memiliki kombinasi id_diklat dan nip yang unik
('1', '111', 'Pelatihan A', 'Rizal', '12345', '001', 'Lembaga A', 'Pelaksana A', '5 Hari', 'S-001', '2024-07-10', 'Pejabat A', '2024-07-01', '2024-07-05', 'A', '1', 'Lulus', '20'),
-- Data 2: Data ini memiliki nip yang sama dengan data 1, tetapi id_diklat berbeda
('2', '222', 'Pelatihan B', 'Rizal', '12345', '002', 'Lembaga B', 'Pelaksana B', '3 Hari', 'S-002', '2024-07-15', 'Pejabat B', '2024-07-10', '2024-07-13', 'B', '2', 'Lulus', '25'),
-- Data 3: Data ini memiliki id_diklat yang sama dengan data 1, tetapi nip berbeda
('3', '111', 'Pelatihan A', 'Andi', '67890', '003', 'Lembaga A', 'Pelaksana A', '5 Hari', 'S-003', '2024-08-01', 'Pejabat C', '2024-07-01', '2024-07-05', 'A', '1', 'Lulus', '20'),
-- Data 4: Data ini memiliki kombinasi id_diklat dan nip yang sama dengan data 1, tetapi tanggal_mulai berbeda
('4', '111', 'Pelatihan A', 'Rizal', '12345', '004', 'Lembaga A', 'Pelaksana A', '5 Hari', 'S-004', '2024-09-01', 'Pejabat D', '2024-08-15', '2024-08-20', 'A', '1', 'Lulus', '20'),
-- Data 5: Data ini memiliki id_diklat yang sama dengan data 3, tetapi nip dan tanggal_mulai berbeda
('5', '111', 'Pelatihan A', 'Siti', '54321', '005', 'Lembaga A', 'Pelaksana A', '5 Hari', 'S-005', '2024-09-01', 'Pejabat E', '2024-08-15', '2024-08-20', 'A', '1', 'Lulus', '20');

SELECT * FROM alumni_diklat WHERE (id_diklat='11' AND nip='12345') OR (nama_peserta='Rizal' AND tanggal_sertifikat='20 Juli 2024');
SELECT * FROM alumni_diklat WHERE (id_diklat='111' AND nip='123456') OR (nama_peserta='Rizall' AND tanggal_sertifikat='21 Juli 2024');
SELECT * FROM alumni_diklat WHERE (id_diklat='11' AND nip='12345') OR (nama_peserta='Rizall' AND tanggal_sertifikat='21 Juli 2024');
SELECT * FROM alumni_diklat WHERE (id_diklat='11' AND nip='12345') OR (nip='123456' AND tanggal_sertifikat='20 Juli 2024');
SELECT * FROM alumni_diklat WHERE (id_diklat='111' AND nip='123456') OR (nip='12345' AND tanggal_sertifikat='20 Juli 2024');

SELECT * FROM alumni_diklat WHERE (id_diklat='111' AND nip='12345') OR (nip='123456' AND tanggal_mulai='1 Juli 2024');
SELECT * FROM alumni_diklat WHERE (id_diklat='111' AND nip='123456') AND (nip='123456' AND tanggal_mulai='1 Juli 2024');


CREATE TABLE users(
    id VARCHAR(255) PRIMARY key,
    nama VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    email VARCHAR,
    password VARCHAR(255) NOT NULL,
    role VARCHAR NOT NULL
);
insert into users(id,nama,username,role,password) 
values('1', 'Rizal', 'rizalyuniar', 'admin', '$2a$10$mzuFR0ytgwYgCshG9W5icuB0mh/E6XZiz3o7ajv0vKvWy1JOMlMnm');
SELECT * FROM users WHERE nama LIKE '%${search}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${size} OFFSET ${offset}
SELECT * FROM users WHERE nama LIKE '%Rizal%' ORDER BY nama ASC LIMIT 10;
SELECT * FROM users ORDER BY nama DESC;

CREATE TABLE aspirasi_pengaduan(
    id VARCHAR(255) PRIMARY key,
    klasifikasi VARCHAR NOT NULL,
    judul VARCHAR NOT NULL,
    nama_pelapor VARCHAR NOT NULL,
    deskripsi VARCHAR,
    tindak_lanjut VARCHAR
);


CREATE TABLE mutasi(
    id VARCHAR(255) PRIMARY key,
    no_rekening varchar references nasabah on update cascade on delete cascade,
    waktu VARCHAR(255),
    kode_transaksi VARCHAR(255),
    nominal VARCHAR(255)
);
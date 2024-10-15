const { UUID } = require("mongodb");
const { client, connectDB } = require("../database/connection");

/**
 * Handles user sign up process.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const signUp = async (req, res) => {
    // Connect to the database
    await connectDB();

    // Array of new user data
    const newUsersData = [
    { username: "2213025050", password: "2213025050", name: "Widya Setiani", angkatan: 2022 },
    { username: "2213025014", password: "2213025014", name: "Munfiatun Nairoh", angkatan: 2022 },
    { username: "2213025024", password: "2213025024", name: "Frisca Monica", angkatan: 2022 },
    { username: "2213025032", password: "2213025032", name: "Pingky Eka Prastiwi", angkatan: 2022 },
    { username: "2213025022", password: "2213025022", name: "Dhena Rahma Septiani", angkatan: 2022 },
    { username: "2213025066", password: "2213025066", name: "Intan Permata S.P", angkatan: 2022 },
    { username: "2213025076", password: "2213025076", name: "Bela Cantika", angkatan: 2022 },
    { username: "2213025044", password: "2213025044", name: "Danar Jati Prasetyo", angkatan: 2022 },
    { username: "2213025048", password: "2213025048", name: "Rintan Filosofi", angkatan: 2022 },
    { username: "2213025016", password: "2213025016", name: "Fransiska Heni Vita Ardita", angkatan: 2022 },
    { username: "2213025004", password: "2213025004", name: "Joe fendika", angkatan: 2022 },
    { username: "2213025052", password: "2213025052", name: "Nur Dwi Kartini", angkatan: 2022 },
    { username: "2213025056", password: "2213025056", name: "Dio Ageng Fernando", angkatan: 2022 },
    { username: "2253025002", password: "2253025002", name: "Muhammad Ibnu Andareas", angkatan: 2022 },
    { username: "2213025026", password: "2213025026", name: "Ravaell irfan siburian", angkatan: 2022 },
    { username: "2213025028", password: "2213025028", name: "I gede Yogi vrindawan", angkatan: 2022 },
    { username: "2213025070", password: "221302070", name: "R.M Arif", angkatan: 2022 },
    { username: "2213025036", password: "2213025036", name: "Rani Lutfia Zahra", angkatan: 2022 },
    { username: "2213025038", password: "2213025038", name: "Rafif Waliuddin", angkatan: 2022 },
    { username: "2213025054", password: "2213025054", name: "Putri Ana Maulina", angkatan: 2022 },
    { username: "2213025040", password: "2213025040", name: "Irvan Shaputra", angkatan: 2022 },
    { username: "2213025030", password: "2213025030", name: "Ratu Inayah Khansa", angkatan: 2022 },
    { username: "2213025058", password: "2213025058", name: "Suryana Tio Fanta Purba", angkatan: 2022 },
    { username: "2213025042", password: "2213025042", name: "Ghefira Primary Orchida", angkatan: 2022 },
    { username: "2213025072", password: "2213025072", name: "Randi Kurniawan", angkatan: 2022 },
    { username: "2213025034", password: "2213025034", name: "Ajeng Indar Arsyida", angkatan: 2022 },
    { username: "2213025060", password: "2213025060", name: "M. Akbar Al Rasyid", angkatan: 2022 },
    { username: "2213025064", password: "2213025064", name: "Lutfi Nur Rohman", angkatan: 2022 },
    { username: "2213025006", password: "2213025006", name: "Hadi rama Wijaya", angkatan: 2022 },
    { username: "2213025002", password: "2213025002", name: "Nestyo Rizky Prasetyo", angkatan: 2022 },
    { username: "2213025010", password: "2213025010", name: "Riko Saputra", angkatan: 2022 },
    { username: "2213025018", password: "2213025018", name: "Dewi Anjani Wibowo", angkatan: 2022 },
    { username: "2213025020", password: "2213025020", name: "Abdul Rahman", angkatan: 2022 },
    { username: "2213025012", password: "2213025012", name: "Khoirunnisaa'Stiani", angkatan: 2022 },
    { username: "2213025046", password: "2213025046", name: "Putri Carlly", angkatan: 2022 },
    { username: "2213025068", password: "2213025068", name: "Muhammad Segaf Alfarizi", angkatan: 2022 },
    { username: "2213025062", password: "2213025062", name: "Jenita Alexsandra kabes", angkatan: 2022 },
];

    try {
        // Loop through the array and insert each user
        for (const user of newUsersData) {
            const { username, password, name, angkatan } = user;

            // Check if username already exists in the database
            const usernameExist = await client.db('LaBooking').collection('Users').findOne({ username });

            if (usernameExist) {
                console.log(`SignUp gagal. Username ${username} sudah ada`);
                continue; // Skip this user if the username already exists
            }

            // Create a new user object with UUID
            const newUser = {
                userId: new UUID(),
                username,
                password,
                name,
                angkatan,
                role: "user"
            };

            // Insert the new user into the database
            const result = await client.db('LaBooking').collection('Users').insertOne(newUser);

            // Check if the user was successfully inserted
            if (result.insertedId) {
                console.log(`SignUp Berhasil untuk ${name}`);
            } else {
                console.log(`SignUp gagal untuk ${name}. Tidak bisa menambahkan ke database`);
            }
        }

        return res.status(201).json({
            success: true,
            message: 'Semua pengguna telah diproses',
        });
    } catch (err) {
        // Log any errors and send a generic error response
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat SignUp'
        });
    }
};

module.exports = { signUp };

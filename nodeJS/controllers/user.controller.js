const asyncHandler = require("express-async-handler"),
    UserRepo = require("../classes/userRepo");

module.exports = class UserController {
    userRepo;

    constructor(userRepoInj = null) {
        this.userRepo = (userRepoInj) ? userRepoInj : new UserRepo();
    }

    // Gets all users from DB
    get_all_users = asyncHandler(async (req, res) => {
        try {
            const allUsersResp = await this.userRepo.getAllUsers();

            if (allUsersResp) {
                res.status(200);
                res.json(allUsersResp);
            } else {
                res.status(500);
                res.json({message: 'Unable to get all users'})
            }

        } catch(err) {
            res.status(500);
            res.json({message: err})
        }
    });

    // Gets logged-in user from Auth0
    get_curr_user = asyncHandler(async (req, res) => {
        const oidc = req.oidc;
        const user = oidc.user;

        if (user) {
            res.status(200);
            res.json(user);
            return true;
        }

        res.status(401);
        res.json({message: 'User is not authenticated!'});
    });

    // Create new user
    create_user = asyncHandler(async (req, res) => {
        const { name, email } = req.body;

        if (!name || !email) {
            res.status(400);
            res.json({
                message: 'Request did not contain id, name, or email address.',
            });
            return false;
        }

        await this.userRepo.addUser(name, email)
            .catch(err => {
                console.error(err);
                res.status(500);
                res.json({message: err.message});

                return false;
            });

        const allUsers = await this.userRepo.getAllUsers();

        res.status(200);
        res.json({ message: 'New user created.', users: allUsers });
    });

    // Updates user specified by user id
    update_user = asyncHandler(async (req, res) => {
        const id = req.params.id;

        if (id) {
            const editUserResp = await this.userRepo.editUser(id, {name: req.body.name, email: req.body.email});

            if (editUserResp && !editUserResp.err) {
                const allUsers = await this.userRepo.getAllUsers();

                res.status(200);
                res.json({ message: 'User updated', users: allUsers });
            } else {
                res.status(editUserResp.status);
                res.json({message: editUserResp.message});
            }
        } else {
            res.status(400);
            res.json({ message: `No id was passed` });
        }

    });

    // Deletes user specified by user id
    delete_user = asyncHandler(async (req, res) => {
        const id = req.params.id;

        if (id) {
            const deleteUserResp = await this.userRepo.deleteUser(id);

            if (deleteUserResp && !deleteUserResp.err) {
                const allUsers = await this.userRepo.getAllUsers();

                res.status(200);
                res.json({ message: `User ${id} deleted successfully.`, users: allUsers });
            } else {
                res.status(deleteUserResp.status);
                res.json({message: deleteUserResp.message});
            }
        } else {
            res.status(404);
            res.json({ message: `You must specify an id for deletion` });
        }
    });
}

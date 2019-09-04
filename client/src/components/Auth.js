import React from 'react';

const Auth = () => {
    return (
        <div>
            <p>Please login!</p>
            <form method='post' action='/login'>
                <input type='text' name='username'/>
                <input type='password' name='password'/>
                <button type='submit' value='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Auth;

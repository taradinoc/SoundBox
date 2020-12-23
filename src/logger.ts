//General imports
import chalk from "chalk";
import symbols from "log-symbols";
import figlet from 'figlet';

class Logger {
    Logger: any;
    banner(message: string): void {
        figlet(message, (err, result) => {
            console.log(chalk.blue(result))
        })
    }
    success(message: String): void {
        console.log(`${new Date()} ${symbols.success} ${chalk.greenBright(message)}`)
    }
    error(message: String): void {
        console.log(`${new Date()} ${symbols.error} ${chalk.redBright(message)}`)
    }
    warn(message: String): void {
        console.log(`${new Date()} ${symbols.warning} ${chalk.gray.bold(message)}`)
    }
    info(message: String): void {
        console.log(`${new Date()} ${symbols.info} ${chalk.redBright.bold(message)}`)
    }
}

//Exports
export default Logger;
import subprocess
import threading
import time

def output_reader(proc):
    for line in iter(proc.stdout.readline, b''):
        if ("Failed to compile." in line.decode('utf-8')):
            print ("Error while trying to compile React")
            exit(84)


def main():
    proc = subprocess.Popen(['npm', 'start'],
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT)

    t = threading.Thread(target=output_reader, args=(proc,))
    t.start()

    try:
        time.sleep(10)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=0.2)
            print('== subprocess exited with rc =', proc.returncode)
            if proc.returncode == 0:
                f = open("VERSION.TMP", "r")
                tmp =  float(f.read())
                f.close()
                subprocess.run("git add *", shell=True, check=False)
                subprocess.run("git commit -m '" + str(tmp) + "'", shell=True, check=False)
                subprocess.run("git push", shell=True, check=False)
                f = open("VERSION.TMP", "w")
                f.write(str(tmp + 0.1))
                f.close()
        except subprocess.TimeoutExpired:
            print('subprocess did not terminate in time')
    t.join()


if __name__ == '__main__':
    main()

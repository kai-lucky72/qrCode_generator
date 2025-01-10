import ctypes
import os
import sys

def is_admin():
    """Check if the program is running with administrative privileges."""
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def main():
    _path = os.getcwd()
    
    if is_admin():
        # Actions to perform as an admin
        cmd = [
            r'''if not exist "C:\\Program Files\\auto-push" mkdir "C:\\Program Files\\auto-push"''',
            f'''copy /Y "{_path}\\auto-push.exe" "C:\\\\Program Files\\auto-push"''',
            "msg %username% Auto-Push has been installed successfully. Final step is to add 'C:\\\\Program Files\\auto-push' to the PATH environment variable",
            r'''"C:\Windows\system32\rundll32.exe" sysdm.cpl,EditEnvironmentVariables'''
        ]

        for command in cmd:
            print("Running: ", command)
            os.system(command)

        input("\n\nPress Any Key To Close This...")
    else:
        # Re-run the program with admin rights
        print("Attempting to gain admin privileges...")
        ctypes.windll.shell32.ShellExecuteW(
            None, "runas", sys.executable, " ".join(sys.argv), None, 1
        )

if __name__ == "__main__":
    main()

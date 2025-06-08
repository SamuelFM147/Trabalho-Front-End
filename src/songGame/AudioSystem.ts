import { Audio } from 'expo-av';
import { useEffect } from 'react';

// Constantes de áudio
export const AudioAssets = {
    TEMA_PRINCIPAL: 'Tema_Principal.mp3',
    FINAL_BOM: 'Final_Bom.mp3',
    ID_0: 'ID_0.mp3',
    ID_1: 'ID_1.mp3',
    ID_2: 'ID_2.mp3',
    ID_3: 'ID_3.mp3',
    ID_4_A_6: 'ID_4_a_6.mp3',
    ID_91: 'ID_91.mp3',
    ID_92: 'ID_92.mp3',
    ID_94: 'ID_94.mp3',
    ID_95: 'ID_95.mp3'
} as const;

// Mapa de recursos de áudio
const audioResources: { [key: string]: any } = {
    'Tema_Principal.mp3': require('../assets/songs/Tema_Principal.mp3'),
    'Final_Bom.mp3': require('../assets/songs/Final_Bom.mp3'),
    'ID_0.mp3': require('../assets/songs/ID_0.mp3'),
    'ID_1.mp3': require('../assets/songs/ID_1.mp3'),
    'ID_2.mp3': require('../assets/songs/ID_2.mp3'),
    'ID_3.mp3': require('../assets/songs/ID_3.mp3'),
    'ID_4_a_6.mp3': require('../assets/songs/ID_4_a_6.mp3'),
    'ID_91.mp3': require('../assets/songs/ID_91.mp3'),
    'ID_92.mp3': require('../assets/songs/ID_92.mp3'),
    'ID_94.mp3': require('../assets/songs/ID_94.mp3'),
    'ID_95.mp3': require('../assets/songs/ID_95.mp3')
};

// Classe de gerenciamento de áudio
class AudioManager {
    private static instance: AudioManager;
    private currentSound: Audio.Sound | null = null;
    private isLoading: boolean = false;
    private isMuted: boolean = false;
    private lastPlayedSound: string | null = null;
    private availableSounds: string[] = [];
    private soundPromise: Promise<void> | null = null;
    private isUnloading: boolean = false;

    private constructor() {
        // Inicializa a lista de sons disponíveis excluindo o tema principal e o final bom
        this.availableSounds = Object.values(AudioAssets).filter(
            sound => sound !== AudioAssets.TEMA_PRINCIPAL && sound !== AudioAssets.FINAL_BOM
        );
    }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    private getRandomSound(): string {
        const availableSoundsWithoutLast = this.availableSounds.filter(
            sound => sound !== this.lastPlayedSound
        );
        
        if (availableSoundsWithoutLast.length === 0) {
            return this.availableSounds[Math.floor(Math.random() * this.availableSounds.length)];
        }

        return availableSoundsWithoutLast[
            Math.floor(Math.random() * availableSoundsWithoutLast.length)
        ];
    }

    private async unloadCurrentSound(): Promise<void> {
        if (this.isUnloading || !this.currentSound) return;

        this.isUnloading = true;
        try {
            const status = await this.currentSound.getStatusAsync();
            if (status.isLoaded) {
                await this.currentSound.stopAsync();
                await this.currentSound.unloadAsync();
            }
        } catch (error) {
            // Silenciosamente ignora erros de descarregamento
        } finally {
            this.currentSound = null;
            this.isUnloading = false;
        }
    }

    public async playSound(soundFile: string, shouldLoop: boolean = false): Promise<void> {
        if (this.isMuted || this.isLoading) return;

        try {
            this.isLoading = true;

            // Espera qualquer operação pendente terminar
            if (this.soundPromise) {
                await this.soundPromise;
            }

            // Para o som atual se estiver tocando
            await this.unloadCurrentSound();

            const resource = audioResources[soundFile];
            if (!resource) {
                console.error('Arquivo de áudio não encontrado:', soundFile);
                return;
            }

            this.soundPromise = new Promise(async (resolve) => {
                try {
                    const { sound } = await Audio.Sound.createAsync(
                        resource,
                        { shouldPlay: false, isLooping: shouldLoop }
                    );

                    if (!this.isMuted) {
                        this.currentSound = sound;
                        this.lastPlayedSound = soundFile;
                        await sound.playAsync();
                    } else {
                        await sound.unloadAsync();
                    }
                } catch (error) {
                    // Silenciosamente ignora erros de reprodução
                } finally {
                    resolve();
                }
            });

            await this.soundPromise;
        } finally {
            this.isLoading = false;
            this.soundPromise = null;
        }
    }

    public async playRandomSound(shouldLoop: boolean = false): Promise<void> {
        if (!this.isLoading) {
            const randomSound = this.getRandomSound();
            await this.playSound(randomSound, shouldLoop);
        }
    }

    public async stopSound(): Promise<void> {
        if (this.soundPromise) {
            await this.soundPromise;
        }
        await this.unloadCurrentSound();
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopSound();
        }
        return this.isMuted;
    }

    public async setVolume(volume: number): Promise<void> {
        if (!this.currentSound || this.isLoading) return;

        try {
            const status = await this.currentSound.getStatusAsync();
            if (status.isLoaded) {
                await this.currentSound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
            }
        } catch (error) {
            // Silenciosamente ignora erros de volume
        }
    }

    public getLastPlayedSound(): string | null {
        return this.lastPlayedSound;
    }
}

// Instância única do gerenciador de áudio
export const audioManager = AudioManager.getInstance();

// Hook personalizado para usar o sistema de áudio
export const useAudio = () => {
    useEffect(() => {
        return () => {
            audioManager.stopSound();
        };
    }, []);

    const playSound = (soundFile: keyof typeof AudioAssets, shouldLoop: boolean = false) => {
        audioManager.playSound(AudioAssets[soundFile], shouldLoop);
    };

    const playRandomSound = (shouldLoop: boolean = false) => {
        audioManager.playRandomSound(shouldLoop);
    };

    const stopSound = () => {
        audioManager.stopSound();
    };

    const toggleMute = () => {
        return audioManager.toggleMute();
    };

    const setVolume = (volume: number) => {
        audioManager.setVolume(volume);
    };

    return {
        playSound,
        playRandomSound,
        stopSound,
        toggleMute,
        setVolume
    };
}; 